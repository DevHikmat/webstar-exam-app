import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-content shadow">
        <div className="login-content-left">
          <img src="./images/logo/logo1.png" alt="logo" />
        </div>
        <div className="login-content-right">
          <h3>Login</h3>
          <form>
            <div className="input-box mb-3">
              <label className="fa-solid fa-envelope"></label>
              <input type="email" className="shadow" placeholder="E-mail" />
            </div>
            <div className="input-box mb-3">
              <label className="fa-solid fa-lock"></label>
              <input type="password" className="shadow" placeholder="parol" />
            </div>
            <button className="login-btn mb-2">login</button>
            <div>
              <Link to="/register">Or register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
