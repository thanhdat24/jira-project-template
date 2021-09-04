import { applyMiddleware, combineReducers, createStore } from "redux";

import { DrawerReducer } from "./DrawerReducer";
import { HistoryReducer } from "./HistoryReducer";
import LoadingReducer from "./LoadingReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { ProjectDetailReducer } from "./ProjectDetailReducer";
import { ProjectEditReducer } from "./ProjectEditReducer";
import { ProjectManagementReducer } from "./ProjectManagementReducer";
import { UserLoginCyberBugsReducer } from "./UserCyberBugsReducer";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import { rootSaga } from "../sagas/rootSaga";

// middleware saga
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  LoadingReducer,
  HistoryReducer,
  UserLoginCyberBugsReducer,
  ProjectCategoryReducer,
  ProjectManagementReducer,
  DrawerReducer,
  ProjectEditReducer,
  ProjectDetailReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);
// Call saga
middlewareSaga.run(rootSaga);

export default store;
