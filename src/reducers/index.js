import { combineReducers } from "redux";

import LoginReducer from "containers/LoginPage/reducer.js";
import RegisterReducer from "containers/RegisterPage/reducer.js";
import SetPasswordPageReducer from "containers/SetPasswordPage/reducer.js";

import ProfileReducer from "containers/Common/ProfilePage/reducer.js";
import BasicInformationReducer from "containers/Common/BasicInformation/reducer.js";
import ChangePasswordReducer from "containers/Common/ChangePassword/reducer.js";
import ImageFieldReducer from "containers/Common/ImageField/reducer.js";
import GlobalSearchReducer from "containers/Common/GlobalSearch/reducer.js";

import PeopleUserPageReducer from "containers/Admin/PeopleUserPage/reducer.js";
import AddUserReducer from "containers/Admin/AddUser/reducer.js";
import PeopleVendorPageReducer from "containers/Admin/PeopleVendorPage/reducer.js";
import AddVendorReducer from "containers/Admin/AddVendor/reducer.js";

import GameHourReducer from "containers/Vendor/GameHour/reducer.js";
import FieldReducer from "containers/Vendor/Fields/reducer.js";
import DescriptionReducer from "containers/Vendor/Description/reducer.js";
import GalleryReducer from "containers/Vendor/Gallery/reducer.js";
import ReviewPageReducer from "containers/Vendor/ReviewPage/reducer.js";
import BookingPageReducer from "containers/Vendor/BookingPage/reducer.js";
import SitePageReducer from "containers/Vendor/SitePage/reducer.js";
import SchedulePageReducer from "containers/Vendor/SchedulePage/reducer.js";

import CreditPageReducer from "containers/User/CreditPage/reducer.js";
import PaymentFormReducer from "containers/User/PaymentForm/reducer.js";
import BookingDetailPageReducer from "containers/User/BookingDetailPage/reducer.js";
import UserDashboardPageReducer from "containers/User/DashboardPage/reducer.js";
import VendorListPageReducer from "containers/User/VendorListPage/reducer.js";

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
  AddUserReducer,
  PeopleVendorPageReducer,
  AddVendorReducer,
  GameHourReducer,
  FieldReducer,
  DescriptionReducer,
  GalleryReducer,
  ReviewPageReducer,
  BookingPageReducer,
  SitePageReducer,
  SchedulePageReducer,
  BookingDetailPageReducer,
  UserDashboardPageReducer,
  VendorListPageReducer
});
