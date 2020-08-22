import { all, fork } from "redux-saga/effects";

import LoginSagas from "containers/LoginPage/saga.js";
import * as RegisterSagas from "containers/RegisterPage/saga.js";
import * as ProfileSagas from "containers/ProfilePage/saga.js";
import BasicInformationSagas from "containers/BasicInformation/saga.js";
import ChangePasswordSagas from "containers/ChangePassword/saga.js";
import CreditPageSagas from "containers/CreditPage/saga.js";
import SetPasswordPageSagas from "containers/SetPasswordPage/saga.js";
import ImageFieldSagas from "containers/ImageField/saga.js";
import PaymentFormSagas from "containers/PaymentForm/saga.js";
import GlobalSearchSagas from "containers/GlobalSearch/saga.js";
import PeopleUserPageSagas from "containers/Admin/PeopleUserPage/saga.js";

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
      PeopleUserPageSagas
    ].map(fork)
  );
}
