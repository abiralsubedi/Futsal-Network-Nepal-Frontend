import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_RATED_VENDOR, GET_NEARBY_VENDOR } from "./constants";
import {
  getRatedVendorSuccess,
  getRatedVendorError,
  getNearbyVendorSuccess,
  getNearbyVendorError
} from "./actions";

function* getRatedVendor() {
  try {
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/most-rated`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getRatedVendorSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getRatedVendorError(errorObj.message));
  }
}

function* getNearbyVendor({ payload }) {
  try {
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/nearby?${payload}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getNearbyVendorSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getNearbyVendorError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_RATED_VENDOR, getRatedVendor);
  yield takeLatest(GET_NEARBY_VENDOR, getNearbyVendor);
}
