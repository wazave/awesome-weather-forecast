import React, { PureComponent } from 'react';

import QueriedCity from './QueriedCity';


class QueriedCityList extends PureComponent {
  render() {
    return (
      <div className="queried-city-list">
        {this.props.queriedCities.map(city => (
          <QueriedCity
            city={city}
            selectedCity={this.props.selectedCityKey}
            onClick={this.props.onClick}
            key={city.key}
          />
        ))}
      </div>
    );
  }
}

export default QueriedCityList;
