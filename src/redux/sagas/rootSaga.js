import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategorySaga";

import { all } from "redux-saga/effects";

// import { theoDoiActionGetTaskApi } from "./ListSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dỗi các action saga cyberbugs...
    Cyberbugs.theoDoiSignin(),
    ProjectCategory.theoDoigetAllProjectCategory(),
    // Nghiệp vụ ...
  ]);
}
