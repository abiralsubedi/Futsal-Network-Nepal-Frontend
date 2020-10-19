import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { updateCreditAmount } from "containers/LoginPage/actions";

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
    let reqAPI = `/booking`;
    if (vendorId) {
      reqAPI = `/vendor/${vendorId}/booking`;
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
    const { bookingId } = payload;
    const token = localStorage.getItem("token");

    const { amount } = yield call(request, `/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    yield put(updateCreditAmount(amount));
    const response = `Booking cancelled successfully.`;
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
