import {
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constants/Cyberbugs/Cyberbug";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, takeLatest } from "@redux-saga/core/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/Notification";
import { taskService } from "../../../services/TaskService";

function* createTaskSaga(action) {
  try {
    yield put({
      type: DiSPLAY_LOADING,
    });
    yield delay(500);
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
    }
    notifiFunction("success", "Successfully!");
    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    notifiFunction("error", "Failed!");
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSagaSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
