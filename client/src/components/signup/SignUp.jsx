import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { signupCall } from "../../utils/apiCalls";
import "./signup.css";

export const SignUp = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const isSamePassword = () => {
    console.log(`password: ${password.current.value}`);
    console.log(`retyped password: ${confirmPassword.current.value}`);
    return confirmPassword.current.value === password.current.value;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password.current.value);
    console.log(confirmPassword.current.value);

    if (!isSamePassword()) {
      confirmPassword.current.setCustomValidity("Password doesn't match!");
    } else {
      setIsLoading(true);
      signupCall({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      });
      setIsLoading(false);
      console.log("New user created");
      history.push("/");
    }
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
                ref={firstName}
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
                ref={lastName}
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
              ref={email}
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
              ref={password}
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
              ref={confirmPassword}
              required
            />
          </div>
          <div id="signup-button" className="form-field">
            <button
              type="submit"
              className={isLoading ? "signup-loading" : null}
            >Sign Up</button>
          </div>
          <div id="log-in" className="form-field">
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
