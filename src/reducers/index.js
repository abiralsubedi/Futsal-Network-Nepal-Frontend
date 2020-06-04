import { combineReducers } from "redux";

import LoginReducer from "containers/LoginPage/reducer.js";
import ProfileReducer from "containers/ProfilePage/reducer.js";

export default combineReducers({
  LoginReducer,
  ProfileReducer
});
