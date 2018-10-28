import * as moment from 'moment';

export const INITIAL_STATE = {
  startDate: moment().subtract(7, 'day').format('YYYY-MM-DD'),
  finalDate: moment().format('YYYY-MM-DD'),
  group: undefined,
};

export default function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, ...action.data };
    default:
      return state;
  }
}