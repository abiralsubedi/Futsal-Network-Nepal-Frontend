import { all, fork } from "redux-saga/effects";

import * as homeSagas from "containers/HomePage/saga.js";
import * as profileSagas from "containers/ProfilePage/saga.js";

export default function* rootSaga() {
  yield all(
    [...Object.values(homeSagas), ...Object.values(profileSagas)].map(fork)
  );
}
