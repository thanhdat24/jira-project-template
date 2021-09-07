import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../constants/Cyberbugs/StatusConstants";
import { call, put, takeLatest } from "redux-saga/effects";

import { statusService } from "../../../services/StatusService";

function* getAllStatus(action) {
  const { data, status } = yield call(() => statusService.getAllStatus());

  try {
    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
