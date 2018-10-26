import React, { Component } from 'react';
import { Chart } from 'chart.js';

class DoughnutChart extends Component {
  componentDidMount () {
    const chartCanvas = this.refs.chart;

    const myChart = new Chart(chartCanvas, {
      type: 'doughnut',
      ...this.props
    });

    this.setState({chart: myChart});
  }

  componentDidUpdate () {
    const chart = this.state.chart;
    const data = this.props.data;

    data.datasets.forEach((dataset, i) => chart.data.datasets[i] = dataset);

    chart.data.labels = data.labels;
    chart.update();
  }

  componentWillUnmount() {
    this.state.chart.destroy();
  }

  render () {
    return (
      <canvas ref={'chart'} height={'400'} width={'600'}></canvas>
    );
  }
}

export default DoughnutChart;