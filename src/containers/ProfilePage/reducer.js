import { GET_TEST_DATA_SUCCESS } from "./constants";

export default (
  state = {
    default: "hello there, please wait",
    updated: ""
  },
  action
) => {
  switch (action.type) {
    case GET_TEST_DATA_SUCCESS:
      return { ...state, updated: action.data };
    default:
      return state;
  }
};
