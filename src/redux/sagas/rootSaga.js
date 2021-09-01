import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";

import { all } from "redux-saga/effects";

// import { theoDoiActionGetTaskApi } from "./ListSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dỗi các action saga cyberbugs...
    Cyberbugs.theoDoiSignin(),
    ProjectCategory.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoicreateProjectSaga(),
    ProjectSaga.theoDoigetListProjectSaga(),
    ProjectSaga.theoDoiupdateProjectSaga(),
    // Nghiệp vụ ...
  ]);
}
