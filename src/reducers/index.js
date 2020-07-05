import { combineReducers } from "redux";

import LoginReducer from "containers/LoginPage/reducer.js";
import RegisterReducer from "containers/RegisterPage/reducer.js";
import ProfileReducer from "containers/ProfilePage/reducer.js";
import BasicInformationReducer from "containers/BasicInformation/reducer.js";
import ChangePasswordReducer from "containers/ChangePassword/reducer.js";
import ImageFieldReducer from "containers/ImageField/reducer.js";

export default combineReducers({
  LoginReducer,
  RegisterReducer,
  ProfileReducer,
  BasicInformationReducer,
  ChangePasswordReducer,
  ImageFieldReducer
});
