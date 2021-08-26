import { applyMiddleware, combineReducers, createStore } from "redux";

import LoadingReducer from "./LoadingReducer";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import { rootSaga } from "../sagas/rootSaga";

// middleware saga
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  LoadingReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);
// Call saga
middlewareSaga.run(rootSaga);

export default store;
