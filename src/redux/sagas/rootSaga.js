import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";

import { all } from "redux-saga/effects";

// import { theoDoiActionGetTaskApi } from "./ListSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dỗi các action saga cyberbugs...
    Cyberbugs.theoDoiSignin(),
    // Nghiệp vụ ...
  ]);
}
