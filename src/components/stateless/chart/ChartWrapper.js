import React from 'react';

function EmptyChart() {
  return <span>Empty chart</span>;
}

function Chart(props) {
  const { chart, data, ...other } = props;
  const ChartType = chart;

  return <ChartType data={data} {...other}></ChartType>;
}

function ChartWrapper(props) {
  return !props.data
    ? <EmptyChart />
    : <Chart {...props} />;
}

export default ChartWrapper;
