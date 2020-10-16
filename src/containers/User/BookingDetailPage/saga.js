import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_BOOKING_DETAIL, REMOVE_BOOKING } from "./constants";
import {
  getBookingDetailSuccess,
  getBookingDetailError,
  removeBookingSuccess,
  removeBookingError
} from "./actions";

function* getBookingDetail({ payload }) {
  try {
    const { vendorId, query } = payload;
    const token = localStorage.getItem("token");
    let reqAPI = `/vendor/booking-detail`;
    if (vendorId) {
      reqAPI = `/vendor/${vendorId}/booking-detail`;
    }

    const response = yield call(request, `${reqAPI}?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getBookingDetailSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getBookingDetailError(errorObj.message));
  }
}

function* removeBooking({ payload }) {
  try {
    const { vendorId, fieldId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/field`, {
      method: fieldId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = `Field ${fieldId ? "updated" : "created"} successfully.`;
    yield put(removeBookingSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(removeBookingError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_BOOKING_DETAIL, getBookingDetail);
  yield takeLatest(REMOVE_BOOKING, removeBooking);
}
