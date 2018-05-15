import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { DateTime } from 'luxon';
import 'whatwg-fetch';

import getCitySugestions from './autocomplete-service';
import ISOCountryCodes from './country-codes-hash.json';
import SearchField from './components/search-field';
import WeatherDisplay from './components/weather-display';
import SearchHistory from './components/search-history';
import EmptyCityState from './components/empty-city-state';
import firebase from './firebase';
import './App.css';


const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=34c495267a0e2042af4c7d4d7e72e143&q=';
const fiveDayweatherURL = 'https://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&appid=34c495267a0e2042af4c7d4d7e72e143&q=';

const database = firebase.database();

function formatPredictions(predictions) {
  return predictions.map(prediction => ({
    key: prediction.id,
    mainText: prediction.structured_formatting.main_text,
    secondaryText: prediction.structured_formatting.secondary_text,
    city: prediction.terms[0].value,
    countryCode: ISOCountryCodes[prediction.terms.slice(-1)[0].value],
  }))
    .filter(({ countryCode, secondaryText }) => countryCode && secondaryText);
}

function parseResult(result) {
  return result.json()
}

function formatCurrentWeather(weaterData) {
  return {
    temp: Math.round(weaterData.main.temp),
    icon: weaterData.weather[0].icon,
    description: weaterData.weather[0].description
      .replace(/\b\w/g, l => l.toUpperCase()),
  }
}

function formatWeather(prev, curr) {
  const yearDay = curr.luxonDate.ordinal;
  const minTemp = Math.round(curr.main.temp_min);
  const maxTemp = Math.round(curr.main.temp_max);
  if (!prev[yearDay]) {
    const currWeater = curr.weather[0];
    prev[yearDay] = {
      day: curr.luxonDate.c.day,
      hourlyWeather: [],
      minTemp,
      maxTemp,
      weather: {
        icon: currWeater.icon,
        description: currWeater.description
          .replace(/\b\w/g, l => l.toUpperCase()),
      },
      weekday: curr.luxonDate.weekdayShort,
      yearDay,
    };
  }
  if (prev[yearDay].minTemp > minTemp) {
    prev[yearDay].minTemp = minTemp
  }
  if (prev[yearDay].maxTemp < maxTemp) {
    prev[yearDay].maxTemp = maxTemp
  }
  const hourWeather = {
    index: (curr.luxonDate.c.hour / 3),
    temp: Math.round(curr.main.temp),
  };
  prev[yearDay].hourlyWeather.push(hourWeather);
  return prev;
}

function addLuxonDate(weather) {
  return Object.assign({ luxonDate: DateTime.fromSQL(weather.dt_txt) }, weather);
}

function fillMissingHourlyWeatherData(hourlyWeather) {
  const completeDataSet = new Array(9).fill(null);
  hourlyWeather.forEach(weater => {
    completeDataSet[weater.index] = weater.temp;
  })
  return completeDataSet;
}


class App extends Component {
  state = {
    searchValue: '',
    cityPredictions: [],
    searchedCities: [],
  };

  componentDidMount() {
    database.ref('queriedCities').on('value', (snapshot) => {
      const queriedCities = snapshot.val();
      if (queriedCities) {
        const searchedCities = Object.keys(queriedCities)
          .map(key => queriedCities[key]);
        this.setState({ searchedCities });
      }
    });
  }

  autocompleteSearch = debounce(() => {
    if (this.state.searchValue) {
      getCitySugestions(this.state.searchValue)
        .then(formatPredictions)
        .then(cityPredictions => this.setState({ cityPredictions }));
    }
  }, 300);

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    }, this.autocompleteSearch);
  };

  handleSearchSubmit = (event) => {
    if (this.state.cityPredictions.length > 0) {
      const selectedCity = this.state.cityPredictions[0];
      this.setState({
        selectedCity,
        searchValue: '',
        cityPredictions: [],
      }, this.fetchWeatherData);
    }
    event.preventDefault();
  }

  onPredictionItemClick = key => {
    const selectedCity = this.state.cityPredictions.filter(city => city.key === key)[0];
    this.setState({
      selectedCity,
      searchValue: '',
      cityPredictions: [],
    }, this.fetchWeatherData);
  }

  fetchWeatherData = () => {
    const { city, countryCode } = this.state.selectedCity;
    return Promise.all([
      fetch(`${weatherURL}${city},${countryCode}`).then(parseResult),
      fetch(`${fiveDayweatherURL}${city},${countryCode}`).then(parseResult),
    ])
      .then(([currentWeatherData, weatherForecastData]) => {
        const formattedWeatherForecast = weatherForecastData.list
          .map(addLuxonDate)
          .reduce(formatWeather, {});
        const weatherForecast = [];
        Object.keys(formattedWeatherForecast)
          .forEach((day, index) => {
            const nextDay = formattedWeatherForecast[Number(day) + 1];
            if (nextDay) {
              const lastMinuteWeather = {
                index: 8,
                temp: nextDay.hourlyWeather[0].temp
              };
              formattedWeatherForecast[day].hourlyWeather.push(lastMinuteWeather);
            }
            formattedWeatherForecast[day].hourlyWeather =
              fillMissingHourlyWeatherData(formattedWeatherForecast[day].hourlyWeather);
            weatherForecast.push(formattedWeatherForecast[day]);
          })
        const currentWeather = formatCurrentWeather(currentWeatherData);
        this.setState({
          currentWeather,
          weatherForecast,
          selectedDay: weatherForecast[0].day,
        });
        this.storeSelectedCity();
      });
  }

  storeSelectedCity = () => {
    const cityNotQueriedBefore = this.state.searchedCities
      .filter(city => city.key === this.state.selectedCity.key).length === 0;
    if (cityNotQueriedBefore) {
      database.ref('queriedCities/' + this.state.selectedCity.key).set(this.state.selectedCity);
    }
  }

  setSelectedDay = selectedDay => {
    this.setState({
      selectedDay,
    })
  }

  setSelectedCity = selectedCity => {
    this.setState({
      selectedCity,
      searchValue: '',
      cityPredictions: [],
    }, this.fetchWeatherData);
  }

  render() {
    return (
      <div className="main">
        <SearchField
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
          predictions={this.state.cityPredictions}
          onPredictionItemClick={this.onPredictionItemClick}
        />
        {!this.state.currentWeather && <EmptyCityState />}
        {(this.state.selectedCity && this.state.currentWeather) && <WeatherDisplay
          currentWeather={this.state.currentWeather}
          selectedCity={this.state.selectedCity}
          weatherForecast={this.state.weatherForecast}
          selectedDay={this.state.selectedDay}
          setSelectedDay={this.setSelectedDay}
        />}
        <SearchHistory
          queriedCities={this.state.searchedCities}
          selectedCity={this.state.selectedCity}
          onClick={this.setSelectedCity}
        />
      </div>
    );
  }
}

export default App;
