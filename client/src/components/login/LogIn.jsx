import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
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
            <button type="submit">Log In</button>
          </div>
          <div id="forgot-password" className="form-field">
            <a href="#">Forgot Password?</a>
          </div>
          <div id="sign-up" className="form-field">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
