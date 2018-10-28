import { groups } from './groups';
import { compose, curry, map, filter, into } from 'ramda';
import * as moment from 'moment';

const getAppliedGroup = (transaction) =>
  groups.find(isFromGroup.bind(null, transaction)) || {
    name: 'Others'
  };

const isFromGroup = (transaction, group) => group.matches.every(rule =>
  rule.regex.test(transaction[rule.field])
);

const addGroup = (transaction) => Object.assign(transaction, {
  group: getAppliedGroup(transaction).name
});

const filterTransactions = curry((group, final, start, item) => ((date) => 
  date.isSameOrBefore(final) && date.isSameOrAfter(start) && (
    !group || group === item.group
  )
)(moment(item.date)));

export const mapDataToList = (state) => ({
  loading: state.list.loading,
  filter: state.filter,
  transactions: into([], compose(
    filter(filterTransactions(
      state.filter.group,
      moment(state.filter.finalDate, 'YYYY-MM-DD'),
      moment(state.filter.startDate, 'YYYY-MM-DD'),
    )),
    map(addGroup)
  ), state.list.data),
});