import React from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";

const Signup = () => {
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
                type="text"
                className="shadow"
                placeholder="Ismingiz"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="lastname" className="fa-solid fa-user"></label>
              <input
                id="lastname"
                type="text"
                className="shadow"
                placeholder="Familyangiz"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="email" className="fa-solid fa-envelope"></label>
              <input
                id="email"
                type="email"
                className="shadow"
                placeholder="E-mail"
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="password" className="fa-solid fa-lock"></label>
              <input
                id="password"
                type="password"
                className="shadow"
                placeholder="parol"
              />
            </div>
            <div className="input-box mb-3">
              <label for="group" className="fa-solid fa-users-line"></label>
              <select name="group" id="group" className="shadow">
                <option value="">Guruhni tanlash</option>
                <option value="">H1</option>
                <option value="">H2</option>
                <option value="">H3</option>
              </select>
            </div>
            <button className="signup-btn mb-2">register</button>
            <div>
              <Link to="/">Or login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
