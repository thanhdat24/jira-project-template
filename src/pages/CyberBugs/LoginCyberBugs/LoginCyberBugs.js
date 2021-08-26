import { Button, Input } from "antd";
import {
  FacebookOutlined,
  LockOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";

import React from "react";

export default function LoginCyberBugs(props) {
  return (
    <form className="container">
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "100vh" }}
      >
        <div className="form__group" style={{ width: "100%" }}>
          <h3 className="text-center">Login CyberBugs</h3>
          <div style={{ width: "50%" }} className="mx-auto text-center">
            <Input
              size="large"
              className="my-2"
              name="email"
              type="email"
              placeholder="email"
              prefix={<UserOutlined />}
            />
            <Input.Password
              size="large"
              className="my-2"
              name="password"
              type="password"
              placeholder="password"
              prefix={<LockOutlined />}
            />
          </div>
          <div className="mt-3">
            <Button size="large" htmlType="submit" type="primary">
              Login
            </Button>
            <Button
              size="large"
              htmlType="submit"
              type="default"
              className="ml-3"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
