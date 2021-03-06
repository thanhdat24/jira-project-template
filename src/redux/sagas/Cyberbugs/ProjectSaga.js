import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Cyberbugs/Cyberbug.js";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstants";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { history } from "../../../util/history/history";
import { notifiFunction } from "../../../util/Notification/Notification";

// ---- Create Project Saga ----
function* createProjectSaga(action) {
  // console.log(action);
  // HIỆN THỊ LOADING
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    // Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
      history.push("/projectmanagement");
      notifiFunction("success", "Successfully!");
    }
  } catch (err) {
    console.log(err.response.data);
    notifiFunction("error", "Failed!");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

// ---- Get List Project Saga ----
function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    // Gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

// ----Update Project ----
function* updateProjectSaga(action) {
  // console.log("update", action);
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );
    // Gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
    }
    // yield put({
    //   type: "GET_LIST_PROJECT_SAGA",
    // });
    // Sử dụng yield call , put đều được , thường thì sử dụng yield put ,
    // put cho cả action thường put cho cả saga
    yield call(getListProjectSaga);
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// ----Delete Project ----
function* deleteProjectSaga(action) {
  // console.log("delete", action);
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.deleteProject(action.projectId)
    );
    // Gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
      notifiFunction("success", "Successfully!");
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    notifiFunction("error", "Failed!");
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

// ----Get Project Detail----
function* getProjectDetailSaga(action) {
  // yield put({
  //   type: DiSPLAY_LOADING,
  // });
  // yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getProjectDetail(action.projectId)
    );
    // Lấy api thành công thì đưa dữ liệu lên redux
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
    history.push("/projectmanagement");
  }
  // yield put({
  //   type: HIDE_LOADING,
  // });
}
export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

// ---- Get All Project ----
function* getAllProjectSaga(action) {
  // console.log(action);
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => cyberbugsService.getAllProject());
    // Gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });

      // dispatch dữ liệu ban đầu cho prjectId và tránh cảnh báo
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        idProject: data.content?.[0].id,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
