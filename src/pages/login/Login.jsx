import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import {
  authUserStart,
  authUserSuccess,
  authUserFailure,
} from "../../redux/authSlice";
import { toast } from "react-toastify";
import "./Login.scss";
import { getOneUserSuccess } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email_rf = useRef();
  const passw_rf = useRef();

  const handleLogin = async () => {
    dispatch(authUserStart());
    try {
      const data = await AuthService.login({
        email: email_rf.current.value,
        password: passw_rf.current.value,
      });
      localStorage.setItem("id", data.user._id);
      localStorage.setItem("token", data.token);
      dispatch(authUserSuccess());
      dispatch(getOneUserSuccess(data.user));
      toast.success("Kirish muvoffaqiyatli amalga oshirildi!");
      console.log(data);
      data.user.role === "admin" ? navigate("/admin") : navigate("/cabinet");
    } catch (error) {
      console.log(error);
      dispatch(authUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
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
              <input
                ref={email_rf}
                type="email"
                className="shadow"
                placeholder="E-mail"
              />
            </div>
            <div className="input-box mb-3">
              <label className="fa-solid fa-lock"></label>
              <input
                ref={passw_rf}
                type="password"
                className="shadow"
                placeholder="parol"
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="login-btn mb-2"
            >
              login
            </button>
            <div>
              <Link to="/signup">Or register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
