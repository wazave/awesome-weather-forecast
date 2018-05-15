import React, { PureComponent } from 'react';


class PredictionItem extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.id)
  };

  render() {
    const { mainText, secondaryText } = this.props;
    return (
      <div
        className="prediction__item"
        onClick={this.handleClick}
      >
        <div className="prediction__item-main-text">{mainText}</div>
        <div className="prediction__item-secondary-text">{secondaryText}</div>
      </div>
    );
  }
}

export default PredictionItem;