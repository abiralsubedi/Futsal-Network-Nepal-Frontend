import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request"

import { REQUEST_API_DATA, receiveApiData } from "actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    const response = yield call(request, "/next", {
      method: "GET"
    });
    yield put(receiveApiData(response));
  } catch (e) {
    console.error(e);
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
