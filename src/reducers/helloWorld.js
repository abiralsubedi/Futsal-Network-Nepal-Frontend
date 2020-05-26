import { RECEIVE_HELLO_WORLD } from "../actions";

export default (state = "", action) => {
  switch (action.type) {
    case RECEIVE_HELLO_WORLD:
      return action.text;
    default:
      return state;
  }
};