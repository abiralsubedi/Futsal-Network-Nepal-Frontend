import { GET_TEST_DATA_SUCCESS, GET_TEST_DATA } from "./constants";

export default (
  state = {
    testData: []
  },
  action
) => {
  switch (action.type) {
    case GET_TEST_DATA:
      return { ...state, testData: [] };

    case GET_TEST_DATA_SUCCESS:
      return { ...state, testData: action.data };
    default:
      return state;
  }
};
