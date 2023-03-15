import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { AuthProvider } from "./auth-context/auth.context";
import { ToastContainer, toast } from 'react-toastify';
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import 'react-toastify/dist/ReactToastify.css';
import RTLLayout from "layouts/RTL.js";
import LoginPage from "components/Home/LoginPage";
import SignupPage from "components/Home/SignupPage";

// import { Toaster } from 'react-hot-toast';

let user = localStorage.getItem("user");
user = JSON.parse(user);

ReactDOM.render(
  <AuthProvider userData={user}>
    <HashRouter>
    <ToastContainer />
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Route path={`/login`} component={LoginPage} />
        <Route path={`/signup`} component={SignupPage} />
        <Redirect from={`/`} to="/login" />
      </Switch>
    </HashRouter>
  </AuthProvider>,
  document.getElementById("root")
);
