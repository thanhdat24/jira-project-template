import { applyMiddleware, combineReducers, createStore } from "redux";

import { HistoryReducer } from "./HistoryReducer";
import LoadingReducer from "./LoadingReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
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
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);
// Call saga
middlewareSaga.run(rootSaga);

export default store;
