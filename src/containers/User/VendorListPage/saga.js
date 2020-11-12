import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_VENDOR_LIST } from "./constants";
import { getVendorListSuccess, getVendorListError } from "./actions";

function* getVendorList({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const { query } = payload;

    const response = yield call(request, `/vendor/custom-search?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(getVendorListSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(getVendorListError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_VENDOR_LIST, getVendorList);
}
