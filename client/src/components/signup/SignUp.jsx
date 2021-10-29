import React from "react";
import { Link } from "react-router-dom";
import "./signup.css";

export const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Done");
  };

  return (
    <div id="signup-wrapper">
      <div id="signup-box">
        <h2 className="app-name">Sign up for ChatIO</h2>
        <form method="post" id="signup-form" onSubmit={handleSubmit}>
          <div id="signup-name" className="form-field">
            <div id="signup-firstname">
              <label htmlFor="signup-firstname"></label>
              <input
                type="text"
                className="signup-input"
                name="signup-firstname"
                placeholder="First Name"
                required
              />
            </div>
            <div id="signup-lastname">
              <label htmlFor="signup-lastname"></label>
              <input
                type="text"
                className="signup-input"
                name="signup-lastname"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div id="signup-email" className="form-field">
            <label htmlFor="signup-email"></label>
            <input
              type="email"
              className="signup-input"
              name="signup-email"
              placeholder="Email address"
              required
            />
          </div>
          <div id="signup-password" className="form-field">
            <label htmlFor="signup-password"></label>
            <input
              type="password"
              className="signup-input"
              name="signup-password"
              placeholder="Password"
              autoComplete="off"
              minLength="8"
              required
            />
          </div>
          <div id="signup-confirm-password" className="form-field">
            <label htmlFor="signup-confirm-password"></label>
            <input
              type="password"
              className="signup-input"
              name="signup-confirm-password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
            />
          </div>
          <div id="signup-button" className="form-field">
            <button type="submit">Sign Up</button>
          </div>
          <div id="log-in" className="form-field">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
