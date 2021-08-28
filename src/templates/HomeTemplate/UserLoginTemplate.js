import { Button, Layout } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import { Route } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
export const UserLoginTemplate = (props) => {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({ width: window.innerWidth });
    };
  });
  let { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout>
              <Sider
                width={width / 2}
                style={{
                  height: "100vh",
                  backgroundImage: "url(https://picsum.photos/2000)",
                  backgroundSize: "100%",
                }}
              ></Sider>
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
