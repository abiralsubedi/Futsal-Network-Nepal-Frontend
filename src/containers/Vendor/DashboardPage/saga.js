import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import getDateTime from "utils/getDateTime";

import { GET_DASHBOARD_INFO, GET_CURRENT_BOOKING } from "./constants";
import {
  getDashboardInfoSuccess,
  getDashboardInfoError,
  getCurrentBookingSuccess,
  getCurrentBookingError
} from "./actions";

function* getDashboardInfo() {
  try {
    const token = localStorage.getItem("token");
    const reqDate = getDateTime(new Date("2020-11-25"), "dashedDate");

    const response = yield call(
      request,
      `/vendor/dashboard-info?presentDate=${reqDate}&day=${new Date().getDay()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getDashboardInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getDashboardInfoError(errorObj.message));
  }
}

function* getCurrentBooking() {
  try {
    const token = localStorage.getItem("token");
    const reqDate = getDateTime(new Date("2020-11-25"), "dashedDate");

    const response = yield call(
      request,
      `/vendor/current-booking?presentDate=${reqDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getCurrentBookingSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getCurrentBookingError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_DASHBOARD_INFO, getDashboardInfo);
  yield takeLatest(GET_CURRENT_BOOKING, getCurrentBooking);
}
