import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_GLOBAL_SEARCH } from "./constants";
import { getGlobalSearchSuccess, getGlobalSearchError } from "./actions";

let oldController;

function* getGlobalSearch({ payload }) {
  try {
    const token = localStorage.getItem("token");

    if (oldController) {
      oldController.abort();
    }
    oldController = new AbortController();
    const signal = oldController.signal;

    const response = yield call(
      request,
      `/vendor/search?searchText=${payload}`,
      {
        signal,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    yield put(getGlobalSearchSuccess(response));
  } catch (error) {
    if (error.name === "AbortError") {
      return yield put(getGlobalSearchError("Cancelled"));
    }
    const errorObj = yield error.response.json();
    yield put(getGlobalSearchError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_GLOBAL_SEARCH, getGlobalSearch);
}
