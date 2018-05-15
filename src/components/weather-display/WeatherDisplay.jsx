import React, { PureComponent } from 'react';

import CurrentWeather from './CurrentWeather';
import DailyForecastList from './DailyForecastList';
import HourlyGraph from './HourlyGraph';
import './WeatherDisplay.css';


class WeatherDisplay extends PureComponent {
  render() {
    return (
      <section className="weather">
        <CurrentWeather
          currentWeather={this.props.currentWeather}
          selectedCity={this.props.selectedCity}
        />
        <DailyForecastList
          weatherForecast={this.props.weatherForecast}
          selectedDay={this.props.selectedDay}
          setSelectedDay={this.props.setSelectedDay}
        />
        <HourlyGraph
          data={this.props.weatherForecast.filter(dayData =>
            dayData.day === this.props.selectedDay)[0].hourlyWeather}
        />
      </section>
    );
  }
}

export default WeatherDisplay;
