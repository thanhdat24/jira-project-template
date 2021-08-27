import * as Yup from "yup";

import { Button, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import React from "react";
import { connect } from "react-redux";
import { siginCyberbugsAction } from "../../../redux/actions/CyberBugsAction";
import { withFormik } from "formik";

function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form onSubmit={handleSubmit} className="container">
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "100vh" }}
      >
        <div className="form__group" style={{ width: "100%" }}>
          <h3 className="text-center">{props.displayName}</h3>
          <div style={{ width: "50%" }} className="mx-auto text-center">
            <Input
              onChange={handleChange}
              size="large"
              className="my-2"
              name="email"
              type="email"
              placeholder="email"
              prefix={<UserOutlined />}
            />
            <div className="text-danger">{errors.email}</div>
            <Input.Password
              onChange={handleChange}
              size="large"
              className="my-2"
              name="password"
              type="password"
              placeholder="password"
              prefix={<LockOutlined />}
            />
            <div className="text-danger">{errors.password}</div>
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
const LoginCyberBugsWithFomik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string().min(6, "password must be at least 6 characters"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(siginCyberbugsAction(values.email, values.password));
    // console.log(props);
    // console.log(values);
  },

  displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFomik);
