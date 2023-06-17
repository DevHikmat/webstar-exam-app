import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useSelector, useDispatch } from "react-redux";
import {
  authUserStart,
  authUserSuccess,
  authUserFailure,
} from "../../redux/authSlice";
import { toast } from "react-toastify";
import "./Signup.scss";
import { getOneUserSuccess } from "../../redux/userSlice";

const Signup = () => {
  const { groups } = useSelector((state) => state.groups);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async () => {
    dispatch(authUserStart());
    try {
      const data = await AuthService.signup(user);
      localStorage.setItem("id", data.user._id);
      localStorage.setItem("token", data.token);
      dispatch(authUserSuccess());
      dispatch(getOneUserSuccess(data.user));
      toast.success("Kirish muvoffaqiyatli amalga oshirildi!");
      data.user.role === "admin" ? navigate("/admin") : navigate("/cabinet");
    } catch (error) {
      dispatch(authUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup-content shadow">
        <div className="signup-content-left">
          <img src="./images/logo/logo1.png" alt="logo" />
        </div>
        <div className="signup-content-right">
          <h3>Sign up</h3>
          <form>
            <div className="input-box mb-3">
              <label htmlFor="firstname" className="fa-solid fa-user"></label>
              <input
                id="firstname"
                onChange={(e) => handleChange(e)}
                type="text"
                className="shadow"
                placeholder="Ismingiz"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="lastname" className="fa-solid fa-user"></label>
              <input
                id="lastname"
                onChange={(e) => handleChange(e)}
                type="text"
                className="shadow"
                placeholder="Familyangiz"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="email" className="fa-solid fa-envelope"></label>
              <input
                id="email"
                onChange={(e) => handleChange(e)}
                type="email"
                className="shadow"
                placeholder="E-mail"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="password" className="fa-solid fa-lock"></label>
              <input
                id="password"
                onChange={(e) => handleChange(e)}
                type="password"
                className="shadow"
                placeholder="parol"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="group" className="fa-solid fa-users-line"></label>
              <select
                name="group"
                id="group"
                className="shadow"
                onChange={(e) => handleChange(e)}
              >
                <option style={{ display: "none" }}>Guruhni tanlash</option>
                {groups?.map((group, index) => {
                  return (
                    <option key={index} value={group._id}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="button"
              onClick={handleRegister}
              className="signup-btn mb-2"
            >
              register
            </button>
            <div>
              <Link to="/login">Or login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
