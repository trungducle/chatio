import React from "react";
import "./login.css";

export const LogIn = () => {
  return (
    <div id="login-wrapper">
      <div id="login">
        <h2 className="app-name">Welcome to ChatIO!</h2>
        <form method="post" id="login-box">
          <div id="login-email" className="form-field">
            <label htmlFor="login-email"></label>
            <input
              type="text"
              className="login-input"
              name="login-email"
              placeholder="Email address or phone number"
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
              required
            />
          </div>
          <div id="login-button" className="form-field">
            <button type="submit">Log In</button>
          </div>
          <div id="forgot-password" className="form-field">
            <a href="#">Forgot Password?</a>
          </div>
          <div id="sign-up" className="form-field">
            Don't have an account? <a href="#">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};
