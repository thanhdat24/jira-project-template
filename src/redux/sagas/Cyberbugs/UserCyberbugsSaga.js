import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { call, delay, fork, put, take, takeLatest } from "redux-saga/effects";

import Axios from "axios";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbug";
import { cyberbugsService } from "../../../services/CyberbugsService";

// Quản lý các action saga
function* signin(action) {
  console.log(action);
  yield put({
    type: DiSPLAY_LOADING,
  });
  yield delay(500);
  // Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );
    // Lưu vào localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signin);
}
