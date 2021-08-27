import "./App.css";

import { BrowserRouter, Switch } from "react-router-dom";

import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import React from "react";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

function App() {
  return (
    <BrowserRouter>
      <LoadingComponent />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
