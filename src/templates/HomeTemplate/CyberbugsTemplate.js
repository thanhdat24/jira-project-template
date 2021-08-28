import "../../index.css";

import { Fragment } from "react";
import Menu from "../../components/Cyberbugs/Menu";
import Modal from "../../components/Cyberbugs/Modal/Modal";
import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Cyberbugs/Sidebar";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="jira">
              <Sidebar />
              <Menu />
              <Component {...propsRoute} />
              <Modal />
            </div>
          </Fragment>
        );
      }}
    />
  );
};
