import "./App.css";

import { BrowserRouter, Router, Switch, useHistory } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

import Home from "./pages/CyberBugs/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);
  return (
    <Fragment>
      <LoadingComponent />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
