import React, { PureComponent } from 'react';


function getIconURL(icon) {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

function formatTemp(temp) {
  return `${temp}°`
}

class DailyForecast extends PureComponent {
  render() {
    const { forecast, selected } = this.props;
    return (
      <div
        className={`daily-forecast ${selected ? 'daily-forecast--selected' : ''}`}
        onClick={() => this.props.setSelectedDay(forecast.day)}
      >
        <div className="daily-forecast__date">{`${forecast.weekday}. ${forecast.day}`}</div>
        <div className="image-container">
          <img src={getIconURL(forecast.weather.icon)} className="image" alt={forecast.weather.description} />
        </div>
        <div className="daily-forecast__data">
          <div className="daily-forecast__max-temp">{formatTemp(forecast.maxTemp)}</div>
          <div className="daily-forecast__min-temp">{formatTemp(forecast.minTemp)}</div>
        </div>
        <div className="daily-forecast__description">{forecast.weather.description}</div>
      </div>
    );
  }
}

export default DailyForecast;
