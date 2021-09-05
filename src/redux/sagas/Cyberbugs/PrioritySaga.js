import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs/Cyberbug";
import { call, put, takeLatest } from "@redux-saga/core/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { priorityService } from "../../../services/PriorityService";

function* getAllPrioritySaga(action) {
  try {
    const { data, status } = yield call(() => priorityService.getAllPriority());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY,
        arrPriority: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
