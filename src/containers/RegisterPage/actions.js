import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAR_REGISTER_MESSAGE
} from "./constants";

export const register = payload => {
  return { type: REGISTER, payload };
};
export const registerSuccess = payload => {
  return { type: REGISTER_SUCCESS, payload };
};
export const registerError = error => {
  return { type: REGISTER_ERROR, error };
};

export const clearRegisterMessage = () => {
  return { type: CLEAR_REGISTER_MESSAGE };
};
