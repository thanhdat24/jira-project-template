import {
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/Cyberbugs/Cyberbug.js";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, takeLatest } from "@redux-saga/core/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/Notification";
import { taskService } from "../../../services/TaskService";

/* CREATE TASK SAGA */
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
      // console.log("data", data);
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

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

/* GET TASK DETAIL SAGA */
function* getTaskDetailSaga(action) {
  const { taskId } = action;
  console.log(action);
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // console.log("data", data);
      yield put({ type: GET_TASK_DETAIL, taskDetailModal: data.content });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

/* UPDATE TASK SAGA */
function* getUpdateTaskSaga(action) {
  const { taskStatusUpdate } = action;
  // Cập nhật api status cho task hiện tại (Task đang mở modal)
  try {
    const { data, status } = yield call(() =>
      taskService.updateStatus(taskStatusUpdate)
    );
    // Sau khi success gọi lại GET_PROJECT API để sắp xếp lại thông tin các task
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      // Load lại trang web
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, getUpdateTaskSaga);
}
