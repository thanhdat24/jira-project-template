import "./App.css";

import { BrowserRouter, Router, Switch, useHistory } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import DrawerCyberBugs from "./HOC/Modal/DrawerCyberBugs";
import Home from "./pages/CyberBugs/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProjectDetail from "./pages/CyberBugs/ProjectDetail/ProjectDetail";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import ProjectSettings from "./pages/CyberBugs/ProjectSettings/ProjectSettings";
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
      <DrawerCyberBugs />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <CyberbugsTemplate path="/cyberbugs" Component={ProjectDetail} />
        <CyberbugsTemplate
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          path="/projectsettings"
          Component={ProjectSettings}
        />
        <CyberbugsTemplate
          path="/projectdetail/:projectId"
          Component={ProjectDetail}
        />
        <CyberbugsTemplate exact path="/" Component={ProjectManagement} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
