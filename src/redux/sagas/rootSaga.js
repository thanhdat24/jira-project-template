import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";

import { all } from "redux-saga/effects";

// import { theoDoiActionGetTaskApi } from "./ListSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dỗi các action saga cyberbugs...
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    ProjectCategory.theoDoiGetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetPrioritySaga(),
    TaskSaga.theoDoiCreateTaskSagaSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),
    // Nghiệp vụ ...
  ]);
}
