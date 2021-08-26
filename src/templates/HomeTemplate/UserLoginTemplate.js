import { Button, Layout } from "antd";
import React, { Fragment } from "react";

import { Route } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
export const UserLoginTemplate = (props) => {
  let { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout>
              <Sider
                width={window.innerWidth / 2}
                style={{
                  height: "100vh",
                  backgroundImage: "url(https://picsum.photos/2000)",
                  backgroundSize: "100%",
                }}
              ></Sider>
              <Content>
                <Component />
              </Content>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
