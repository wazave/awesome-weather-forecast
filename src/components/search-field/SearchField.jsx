import React, { PureComponent } from 'react';

import PredictionList from './PredictionList';
import './SearchField.css';


class SearchField extends PureComponent {
  render() {
    return (
      <section className="search">
        <form
          className="form"
          onSubmit={this.props.onSubmit}
        >
          <input
            type="search"
            className="search__field"
            placeholder="Search for cities..."
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <PredictionList
            predictions={this.props.predictions}
            onPredictionItemClick={this.props.onPredictionItemClick}
          />
        </form>
      </section>
    );
  }
}

export default SearchField;
