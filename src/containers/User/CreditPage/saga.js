import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_CREDIT_HISTORY } from "./constants";
import { getCreditHistorySuccess, getCreditHistoryError } from "./actions";

function* getCreditHistory({ payload }) {
  try {
    const { startDate, endDate } = payload;
    const token = localStorage.getItem("token");
    const response = yield call(
      request,
      `/credit-history?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getCreditHistorySuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getCreditHistoryError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_CREDIT_HISTORY, getCreditHistory);
}
