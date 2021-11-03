import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LogIn } from "./components/login/LogIn";
import { SignUp } from "./components/signup/SignUp";

export const UnauthApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LogIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  </Router>
);
