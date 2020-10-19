import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import request from "utils/request";

import { updateCreditAmount } from "containers/LoginPage/actions";

import { GET_FIELD, GET_GAME_HOUR, POST_BOOKING } from "./constants";
import {
  getFieldSuccess,
  getFieldError,
  getGameHourError,
  getGameHourSuccess,
  postBookingSuccess,
  postBookingError
} from "./actions";

function* getField({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(
      request,
      `/vendor/${vendorId}/available-field`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getFieldSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getFieldError(errorObj.message));
  }
}

function* getGameHour({ payload }) {
  try {
    const { vendorId, query } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(
      request,
      `/vendor/${vendorId}/available-game?${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getGameHourSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getGameHourError(errorObj.message));
  }
}

function* postBooking({ payload }) {
  try {
    const token = localStorage.getItem("token");

    const { amount } = yield call(request, `/booking`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(updateCreditAmount(amount));
    yield put(postBookingSuccess("Booking is completed."));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postBookingError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeEvery(GET_FIELD, getField);
  yield takeLatest(GET_GAME_HOUR, getGameHour);
  yield takeLatest(POST_BOOKING, postBooking);
}
