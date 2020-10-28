import { all, fork } from "redux-saga/effects";

import LoginSagas from "containers/LoginPage/saga.js";
import * as RegisterSagas from "containers/RegisterPage/saga.js";
import * as ProfileSagas from "containers/Common/ProfilePage/saga.js";
import BasicInformationSagas from "containers/Common/BasicInformation/saga.js";
import ChangePasswordSagas from "containers/Common/ChangePassword/saga.js";
import CreditPageSagas from "containers/User/CreditPage/saga.js";
import SetPasswordPageSagas from "containers/SetPasswordPage/saga.js";
import ImageFieldSagas from "containers/Common/ImageField/saga.js";
import PaymentFormSagas from "containers/User/PaymentForm/saga.js";
import GlobalSearchSagas from "containers/Common/GlobalSearch/saga.js";
import PeopleUserPageSagas from "containers/Admin/PeopleUserPage/saga.js";
import AddUserSagas from "containers/Admin/AddUser/saga.js";
import PeopleVendorPageSagas from "containers/Admin/PeopleVendorPage/saga.js";
import AddVendorSagas from "containers/Admin/AddVendor/saga.js";
import GameHourSagas from "containers/Vendor/GameHour/saga.js";
import FieldSagas from "containers/Vendor/Fields/saga.js";
import DescriptionSagas from "containers/Vendor/Description/saga.js";
import GallerySagas from "containers/Vendor/Gallery/saga.js";
import ReviewPageSagas from "containers/Vendor/ReviewPage/saga.js";
import BookingPageSagas from "containers/Vendor/BookingPage/saga.js";
import SitePageSagas from "containers/Vendor/SitePage/saga.js";
import SchedulePageSagas from "containers/Vendor/SchedulePage/saga.js";
import BookingDetailPageSagas from "containers/User/BookingDetailPage/saga.js";

export default function* rootSaga() {
  yield all(
    [
      LoginSagas,
      ...Object.values(RegisterSagas),
      ...Object.values(ProfileSagas),
      BasicInformationSagas,
      ChangePasswordSagas,
      ImageFieldSagas,
      SetPasswordPageSagas,
      PaymentFormSagas,
      CreditPageSagas,
      GlobalSearchSagas,
      PeopleUserPageSagas,
      AddUserSagas,
      PeopleVendorPageSagas,
      AddVendorSagas,
      GameHourSagas,
      FieldSagas,
      DescriptionSagas,
      GallerySagas,
      ReviewPageSagas,
      BookingPageSagas,
      SitePageSagas,
      SchedulePageSagas,
      BookingDetailPageSagas
    ].map(fork)
  );
}
