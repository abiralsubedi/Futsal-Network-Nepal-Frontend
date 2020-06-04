import { all, fork } from "redux-saga/effects";

import * as loginSagas from "containers/LoginPage/saga.js";
import * as profileSagas from "containers/ProfilePage/saga.js";

export default function* rootSaga() {
  yield all(
    [...Object.values(loginSagas), ...Object.values(profileSagas)].map(fork)
  );
}
