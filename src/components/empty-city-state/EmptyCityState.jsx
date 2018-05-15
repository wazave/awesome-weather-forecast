import React, { PureComponent } from 'react';


import './EmptyCityState.css';

class EmptyCityState extends PureComponent {
  render() {
    return (
      <section className="empty-city-state">
        <div className="empty-city-state__primary-text">
          Welcome to the cities weather app.
        </div>
        <div className="empty-city-state__secondary-text">
          Search for a city or select a previous search to display its weather.
        </div>
      </section>
    );
  }
}

export default EmptyCityState;
