import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_VENDOR_LIST } from "./constants";
import { getVendorListSuccess, getVendorListError } from "./actions";

function* getVendorList() {
  try {
    const token = localStorage.getItem("token");

    const response = yield call(request, `/vendor/custom-search?searchText=&minRate=0&maxRate=5`, {
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
