import {
  CHANGE_ASSIGNEES,
  CHANGE_TASK_MODAL,
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGNEES,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../../constants/Cyberbugs/Cyberbug.js";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";

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

/* UPDATE TASK STATUS SAGA */
function* updateTaskStatusSaga(action) {
  const { taskStatusUpdate } = action;
  // Cập nhật api status cho task hiện tại (Task đang mở modal)
  try {
    const { data, status } = yield call(() =>
      taskService.updateStatus(taskStatusUpdate)
    );
    // Sau khi success gọi lại GET_PROJECT API để sắp xếp lại thông tin các task
    if (status === STATUS_CODE.SUCCESS) {
      // Gọi Api load lại project detail
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskStatusUpdate.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskStatusUpdate.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

// HANDLE CHANGE POST API
function* handleChangePostApi(action) {
  // Gọi action làm thay đổi taskDetail modal
  console.log("action", action);
  // Dispatch từng cái actionType
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;
        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNEES:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNEES,
          userSelected,
        });
      }
      break;
    case REMOVE_USER_ASSIGNEES:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGNEES,
          userId,
        });
      }
      break;
    default:
  }

  // Save qua api updateTaskSaga
  // Lấy dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("taskDetailModal sau khi change", taskDetailModal);
  // Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
  // Dữ liệu api cần thêm mảng listUserAsign, ta thêm vào cho đủ dữ liệu
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModal, listUserAsign };

  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      // Gọi Api load lại project detail
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
