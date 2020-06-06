import { combineReducers } from "redux";

import LoginReducer from "containers/LoginPage/reducer.js";
import RegisterReducer from "containers/RegisterPage/reducer.js";
import ProfileReducer from "containers/ProfilePage/reducer.js";

export default combineReducers({
  LoginReducer,
  RegisterReducer,
  ProfileReducer
});
