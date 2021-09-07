import {
  ADD_USER_PROJECT_API,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  GET_USER_SEARCH,
  REMOVE_USER_PROJECT_API,
  USER_SIGNIN_API,
  USLOGIN,
} from "../../constants/Cyberbugs/Cyberbug";
import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConst";
import {
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constants/Cyberbugs/UserConstants";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
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
import { history } from "../../../util/history/history";
import { userService } from "../../../services/UserServices";

// Quản lý SIGNIN
function* signin(action) {
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
    // let history = yield select((state) => state.HistoryReducer.history);
    history.push("/cyberbugs");
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
// Quản lý GETUSER
function* getUser(action) {
  // Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    // console.log("data", data);
    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUser);
}

// Quản lý ADD_USER
function* addUserProject(action) {
  // console.log(action);
  // Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    // GỌi API LOAD TRANG
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProject);
}

// Quản lý REMOVE USER
function* removeUserProject(action) {
  // console.log(action);
  // Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );
    // GỌi API LOAD TRANG
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProject);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log("check data", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
