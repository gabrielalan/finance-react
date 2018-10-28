import { compose } from 'ramda';
import { fetchJson } from '../helpers/Fetch';

const loadListAction = (data) => ({
  type: 'LOAD_LIST'
});

export const setList = (data) => ({
  type: 'SET_LIST',
  data
});

export const setFilter = (data) => ({
  type: 'SET_FILTER',
  data
});

export const loadList = () => dispatch => {
  dispatch(loadListAction());
  fetchJson('/api/transactions').then(compose(
    dispatch,
    setList
  ));
};