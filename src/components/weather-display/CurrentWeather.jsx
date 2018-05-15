import React, { PureComponent } from 'react';


function getIconURL(icon) {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

class CurrentWeather extends PureComponent {
  render() {
    const { currentWeather, selectedCity } = this.props;
    return (
      <div className="current-weather">
        <div className="current-weather__city-name">{`${selectedCity.mainText}, ${selectedCity.secondaryText}`}</div>
        <div className="current-weather__data">
          <div className="image-container">
            <img src={getIconURL(currentWeather.icon)} className="image" alt={currentWeather.description} />
          </div>
          <div className="current-weather__temp">{`${currentWeather.temp}°`}</div>
          <div className="current-weather__unit">c</div>
        </div>
        <div className="current-weather__description">{currentWeather.description}</div>
      </div>
    );
  }
}

export default CurrentWeather;
