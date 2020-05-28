import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { REQUEST_API_DATA } from "./constants";
import { receiveApiData } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  console.log("hello");
  try {
    const response = yield call(request, "/api", {
      method: "GET"
    });
    yield put(receiveApiData(response));
  } catch (e) {
    console.error(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
