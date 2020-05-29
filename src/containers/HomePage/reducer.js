import { RECEIVE_API_DATA } from "./constants";

export const initialState = { default: "hello", fetched: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return { ...state, fetched: action.data };
    default:
      return state;
  }
};
