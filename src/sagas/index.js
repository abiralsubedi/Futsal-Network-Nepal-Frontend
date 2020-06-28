import { all, fork } from "redux-saga/effects";

import loginSagas from "containers/LoginPage/saga.js";
import * as registerSagas from "containers/RegisterPage/saga.js";
import * as profileSagas from "containers/ProfilePage/saga.js";

export default function* rootSaga() {
  yield all(
    [
      loginSagas,
      ...Object.values(registerSagas),
      ...Object.values(profileSagas)
    ].map(fork)
  );
}
