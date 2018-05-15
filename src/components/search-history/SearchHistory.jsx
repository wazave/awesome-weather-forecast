import React, { PureComponent } from 'react';


import QueriedCityList from './QueriedCityList';
import './SearchHistory.css';

class SearchHistory extends PureComponent {
  render() {
    return (
      <section className="past-searches">
        <div className="section--header">Previous searches</div>
        {this.props.queriedCities.length === 0 &&
          <div className="empty-history-state">No searches done yet.</div>}
        {this.props.queriedCities.length > 0 && <QueriedCityList
          queriedCities={this.props.queriedCities}
          selectedCity={this.props.selectedCity}
          onClick={this.props.onClick}
        />}
      </section>
    );
  }
}

export default SearchHistory;
