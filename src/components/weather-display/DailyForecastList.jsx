import React, { PureComponent } from 'react';

import DailyForecast from './DailyForecast';


class DailyForecastList extends PureComponent {
  render() {
    const weatherForecast = this.props.weatherForecast
      .slice(0, 5);
    return (
      <div className="daily-forecast-container">
        <div className="section--header">Daily</div>
        <div className="daily-forecast-list">
          {weatherForecast.map(dailyForecast => {
            return (
              <DailyForecast
                forecast={dailyForecast}
                selected={this.props.selectedDay === dailyForecast.day}
                key={dailyForecast.yearDay}
                setSelectedDay={this.props.setSelectedDay}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default DailyForecastList;
