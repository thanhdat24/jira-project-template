import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { USER_SIGNIN_API, USLOGIN } from "../../constants/Cyberbugs/Cyberbug";
import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";

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
    const { data, status } = yield cyberbugsService.signinCyberBugs(
      action.userLogin
    );

    // Lưu vào localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/home");
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
