import React from "react";
import { useAuth } from "./auth-context/auth.context";
import { useHistory, Outlet } from "react-router-dom";
import { Route } from "react-router-dom";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory();
  let { user } = useAuth();
  if (!user || !user.token || user.token === "") {
    history.push("/auth/signin");
    toast.error("You must be logged in");
  } else {
    return <Route {...rest} />;
  }
};
