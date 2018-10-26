import React from 'react';
import { connect } from 'react-redux';
import ChartWrapper from '../../../stateless/chart/ChartWrapper';
import DoughnutChart from '../../../stateless/chart/DoughnutChart';
import { mapGroupsToDatasets } from '../../../../helpers/mapDataToChartset';

const Home = ({ outboundByGroup }) => (<>
  <main className="container-fluid">
    <h1>Home</h1>
    <div className="row">
      <div className="col-6">
        <ChartWrapper chart={DoughnutChart} data={outboundByGroup} />
      </div>
    </div>
  </main>
</>);

export default connect(mapGroupsToDatasets)(Home);
