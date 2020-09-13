import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";

import { GET_GAME_HOUR, POST_GAME_HOUR, REMOVE_GAME_HOUR } from "./constants";
import {
  getGameHourSuccess,
  getGameHourError,
  postGameHourSuccess,
  postGameHourError,
  removeGameHourError,
  removeGameHourSuccess
} from "./actions";

function* getGameHour({ payload }) {
  try {
    const { vendorId, dayId } = payload;
    const token = localStorage.getItem("token");

    const response = yield call(
      request,
      `/vendor/${vendorId}/working-hour?dayId=${dayId}`,
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

function* removeGameHour({ payload }) {
  try {
    const { vendorId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/working-hour`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    yield put(removeGameHourSuccess("Game hour deleted successfully"));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(removeGameHourError(errorObj.message));
  }
}

function* postGameHour({ payload }) {
  try {
    const { vendorId, gameHourId } = payload;
    const token = localStorage.getItem("token");

    yield call(request, `/vendor/${vendorId}/working-hour`, {
      method: gameHourId ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = `Game hour ${
      gameHourId ? "updated" : "created"
    } successfully.`;
    yield put(postGameHourSuccess(response));
  } catch (error) {
    const errorObj = yield error.response.json();
    yield put(postGameHourError(errorObj.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_GAME_HOUR, getGameHour);
  yield takeLatest(POST_GAME_HOUR, postGameHour);
  yield takeLatest(REMOVE_GAME_HOUR, removeGameHour);
}
