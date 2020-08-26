import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_USER_LIST } from "./constants";
import { getUserListSuccess, getUserListError } from "./actions";

function* getUserList({ payload }) {
  try {
    const token = localStorage.getItem("token");

    const response = yield call(request, `/people/user?${payload}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getUserListSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getUserListError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_USER_LIST, getUserList);
}
