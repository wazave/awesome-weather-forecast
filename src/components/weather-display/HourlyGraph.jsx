import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';


function addData(data) {
  return {
    labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
    datasets: [
      {
        label: 'Temperature °C',
        cubicInterpolationMode: 'monotone',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'rgba(0,0,0,0.1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,0,0,0.5)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,0,0,0.5)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 30,
        spanGaps: true,
        data,
      }
    ],
    options: {
      responsive: true,
    },
  };
}

const options = {
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
        drawBorder: false,
      }
    }],
    yAxes: [{
      gridLines: {
        display: false,
        drawBorder: false,
      }
    }]
  }
};

class DailyForecast extends PureComponent {
  render() {
    return (
      <div className="hourly-graph">
        <div className="section--header">Hourly</div>
        <Line data={addData(this.props.data)} options={options} />
      </div>
    );
  }
}

export default DailyForecast;
