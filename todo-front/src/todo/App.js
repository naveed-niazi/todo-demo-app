import "./App.css";
//---
import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PasswordReset from "./pages/PasswordReset"
import ForgotPassword from "./pages/ForgotPassword"
import HomePage from "./pages/Homepage"
import ConfirmEmail from "./pages/ConfimEmail";


const App = () => (
  <BrowserRouter>
    <Switch>

      {/* exact routes for user to login */}
      {/* <LoginRoute exact path="/signup" component={Signup} /> */}
      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/reset-password/:resetId" component={PasswordReset} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route path="/confirm/:confirmationCode" component={ConfirmEmail} />
      <Route exact path="/home" component={HomePage} />



      <Redirect from="/" to="/signin" />
    </Switch>
  </BrowserRouter>
);

export default App;
