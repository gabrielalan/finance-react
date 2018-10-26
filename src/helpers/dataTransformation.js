import { compose, curry, lensProp, set } from "ramda";
import { groups as originalGroups } from "./groups";

const getChecker = negative => result => negative ? !result : result;

const getMatchesFilter = curry((matches, checker) => item =>
  matches.every(rule => checker(rule.regex.test(item[rule.field])))
);

const filterByOperation = (operation, data) =>
  data.filter(item => item.operation === operation);

const setCategoryProp = curry((prop, value, category) => set(
  lensProp(prop),
  value,
  category
));

const createCategoryData = (categoryData, filter, data) => data.reduce((acc, item) => !filter(item)
  ? acc
  : compose(
    setCategoryProp('total', acc.total + item.value),
    setCategoryProp('transactions', acc.transactions.concat(item)),
  )(acc),
  { ...categoryData, transactions: [], total: 0 }
);

const createCategories = (groups, data) => groups.map(({ matches, ...rest }) => createCategoryData(
  rest,
  getMatchesFilter(matches, getChecker(false)),
  data
));

const createOthersCategory = (categories, groups, data) => {
  const othersFilter = item => groups.every(
    ({ matches }) => getMatchesFilter(matches, getChecker(true))(item)
  );

  categories.push(createCategoryData(
    { name: 'Others', color: '#cccccc' },
    othersFilter,
    data
  ));

  return categories;
}

function outboundByCategory(outbound) {
  return createOthersCategory(
    createCategories(originalGroups, outbound),
    originalGroups,
    outbound
  );
}

export const groupByCategory = compose(outboundByCategory, curry(filterByOperation)('-'));