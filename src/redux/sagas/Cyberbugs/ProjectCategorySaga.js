import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/Cyberbugs/Cyberbug";
import { call, put, takeLatest } from "redux-saga/effects";

import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { cyberbugsService } from "../../../services/CyberbugsService";

function* getAllProjectCategory(action) {
  // console.log(action);
  // Gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );

    // Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
