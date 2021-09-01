import {
  CREATE_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Cyberbugs/Cyberbug";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { history } from "../../../util/history/history";

// ---- Create Project Saga ----
function* createProjectSaga(action) {
  console.log(action);
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
    }
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoicreateProjectSaga() {
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
export function* theoDoigetListProjectSaga() {
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
      console.log(data);
    }
    // yield call({
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
export function* theoDoiupdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}
