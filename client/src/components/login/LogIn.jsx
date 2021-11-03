import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../utils/apiCalls";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  }

  return (
    <div id="login-wrapper">
      <div id="login-box">
        <h2 className="app-name">Welcome to ChatIO!</h2>
        <form method="post" id="login-form" onSubmit={handleSubmit}>
          <div id="login-email" className="form-field">
            <label htmlFor="login-email"></label>
            <input
              type="email"
              className="login-input"
              name="login-email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div id="login-password" className="form-field">
            <label htmlFor="login-password"></label>
            <input
              type="password"
              className="login-input"
              name="login-password"
              placeholder="Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id="login-button" className="form-field">
            <button
              type="submit"
              className={isLoading ? "login-loading" : null}
            >
              Log In
            </button>
          </div>
          <div id="forgot-password" className="form-field">
            <Link to="/login">Forgot Password?</Link>
          </div>
          <div id="sign-up" className="form-field">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
