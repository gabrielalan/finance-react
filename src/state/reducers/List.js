import { groupByCategory } from "../../helpers/dataTransformation";

function createDataState({ data }) {
  const groupedByCategories = groupByCategory(data);

  return {
    loading: false,
    data,
    groupedByCategories,
    groupedByMonth: []
  }
}

export const INITIAL_STATE = {
  loading: true,
  data: [],
  groupedByCategories: [],
  groupedByMonth: [],
};

export default function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_LIST':
      return INITIAL_STATE;
    case 'SET_LIST':
      return createDataState(action);
    default:
      return state;
  }
}