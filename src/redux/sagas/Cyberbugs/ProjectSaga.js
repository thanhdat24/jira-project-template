import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { CREATE_PROJECT_SAGA } from "../../constants/Cyberbugs/Cyberbug";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { cyberbugsService } from "../../../services/CyberbugsService";

function* createProjectSaga(action) {
  console.log(action);
  // HIỆN THỊ LOADING
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProject(action.newProject)
    );

    // Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
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
