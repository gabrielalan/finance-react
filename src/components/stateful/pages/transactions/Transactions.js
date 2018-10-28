import React from 'react';
import { connect } from 'react-redux';
import { mapDataToList } from '../../../../helpers/mapDataToList';
import { Filter } from '../../../stateless/filter/Filter';
import { groups } from '../../../../helpers/groups';
import { setFilter } from '../../../../state/Actions';
import { TransactionList } from './TransactionList';
import { Loading } from '../../../stateless/loading/Loading';

const mapDispatchToProps = (dispatch) => ({
  onFilter: (data) => {
    dispatch(setFilter(data))
  }
});

const Transactions = (props) => (<>
  <main className="container container-with-loading">
    <h1>Transactions</h1>
    {console.log(props)}
    {props.loading ? <Loading /> : null}
    <Filter data={props.filter} groups={groups} onSubmit={props.onFilter} />
    <TransactionList transactions={props.transactions} />
  </main>
</>);

export default connect(mapDataToList, mapDispatchToProps)(Transactions);
