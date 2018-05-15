import React, { PureComponent } from 'react';

class QueriedCity extends PureComponent {
  render() {
    return (
      <div
        className="queried-city"
        onClick={() => this.props.onClick(this.props.city)}
      >
        <div className="queried-city__main-text">{this.props.city.mainText}</div>
        <div className="queried-city__secondary-text">{this.props.city.secondaryText}</div>
      </div>
    );
  }
}

export default QueriedCity;
