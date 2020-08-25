import { combineReducers } from "redux";

import LoginReducer from "containers/LoginPage/reducer.js";
import RegisterReducer from "containers/RegisterPage/reducer.js";
import ProfileReducer from "containers/ProfilePage/reducer.js";
import BasicInformationReducer from "containers/BasicInformation/reducer.js";
import ChangePasswordReducer from "containers/ChangePassword/reducer.js";
import CreditPageReducer from "containers/CreditPage/reducer.js";
import ImageFieldReducer from "containers/ImageField/reducer.js";
import SetPasswordPageReducer from "containers/SetPasswordPage/reducer.js";
import PaymentFormReducer from "containers/PaymentForm/reducer.js";
import GlobalSearchReducer from "containers/GlobalSearch/reducer.js";
import PeopleUserPageReducer from "containers/Admin/PeopleUserPage/reducer.js";
import AddUserReducer from "containers/Admin/AddUser/reducer.js";

export default combineReducers({
  LoginReducer,
  RegisterReducer,
  ProfileReducer,
  BasicInformationReducer,
  ChangePasswordReducer,
  CreditPageReducer,
  ImageFieldReducer,
  SetPasswordPageReducer,
  PaymentFormReducer,
  GlobalSearchReducer,
  PeopleUserPageReducer,
  AddUserReducer
});
