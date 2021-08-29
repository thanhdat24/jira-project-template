import React, { useState } from "react";

import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.userName === "dat" && userLogin.passWord === "dat") {
      /* Chuyển về trang trước đó */
      //   props.history.goBack();
      /* Chuyển về trang chỉ định sau khi xử lý*/
      // push chuyển hướng đến path tương ứng
      //   props.history.push("/home");
      /* replay thay đổi nội dung path tương ứng*/
      // props.history.replace("/home");
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login fail!");
      return;
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>User Name</p>
        <input
          name="userName"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          name="passWord"
          type="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success" type="submit">
          Login
        </button>
      </div>
      <Prompt
        when={false}
        message={(location) => {
          return "Bạn có chắc muốn thoát không!";
        }}
      />
    </form>
  );
}
