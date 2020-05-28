import { RECEIVE_API_DATA } from "./constants";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return action.data;
    default:
      return state;
  }
};
