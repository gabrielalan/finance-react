import React, { Component } from 'react';
import ChartWrapper from '../../../stateless/chart/ChartWrapper';
import DoughnutChart from '../../../stateless/chart/DoughnutChart';

class Home extends Component {
  render() {
    const data = {
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
          '#36A2EB',
          '#FF3784',
          '#FF3755',
        ]
      }],
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    };

    return (<>
      <h1>Home</h1>
      <ChartWrapper chart={DoughnutChart} data={data} />
    </>);
  }
}

export default Home;
