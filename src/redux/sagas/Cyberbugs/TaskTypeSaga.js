import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constants/Cyberbugs/Cyberbug";
import { call, put, takeLatest } from "@redux-saga/core/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { taskTypeService } from "../../../services/TaskTypeService";

function* getAllTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TASK_TYPE,
        arrTaskType: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
