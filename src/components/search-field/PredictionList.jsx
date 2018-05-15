import React, { PureComponent } from 'react';

import PredictionItem from './PredictionItem';


class PredictionList extends PureComponent {
  render() {
    return (
      <div>
        {this.props.predictions.length > 0 && <div className="prediction">
          {this.props.predictions.map(prediction =>
            <PredictionItem
              id={prediction.key}
              {...prediction}
              onClick={this.props.onPredictionItemClick}
            />
          )}
        </div>}
      </div>
    );
  }
}

export default PredictionList;
