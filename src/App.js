import "./App.css";

import { BrowserRouter, Router, Switch, useHistory } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import Home from "./pages/CyberBugs/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProjectSettings from "./pages/CyberBugs/ProjectSettings/ProjectSettings";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import indexCyberBugs from "./redux/sagas/Cyberbugs/indexCyberBugs";
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
        <CyberbugsTemplate path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          path="/projectsettings"
          Component={ProjectSettings}
        />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
