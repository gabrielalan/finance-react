import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import list from './reducers/List';

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ list }),
  composeEnhancers(applyMiddleware(
    thunk
  ))
);