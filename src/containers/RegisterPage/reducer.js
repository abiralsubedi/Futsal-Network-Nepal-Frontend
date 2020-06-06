import { REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from "./constants";

export const initialState = {
  registerLoading: false,
  registerSuccess: "",
  registerError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerLoading: true,
        registerSuccess: false,
        registerError: false
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: action.payload
      };

    case REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: action.error
      };

    default:
      return state;
  }
};
