import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_TEST_DATA } from "./constants";
import { getTestDataSuccess } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    const response = yield call(request, "/me", {
      method: "GET"
    });
  } catch (e) {
    yield put(getTestDataSuccess("You are welcome!"));
    console.error(e);
  }
}

export default function* mySaga() {
  yield takeLatest(GET_TEST_DATA, getApiData);
}
