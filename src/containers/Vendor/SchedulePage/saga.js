import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_VENDOR_INFO } from "./constants";
import { getVendorInfoSuccess, getVendorInfoError } from "./actions";

function* getVendorInfo({ vendorId }) {
  try {
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/${vendorId}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getVendorInfoSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getVendorInfoError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_VENDOR_INFO, getVendorInfo);
}
