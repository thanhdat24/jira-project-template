import "./index.css";
import "antd/dist/antd.css";

import { BrowserRouter, Router } from "react-router-dom";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { history } from "./util/history/history";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/reducers/configStore";

// setup redux

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
