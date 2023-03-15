import React from "react";
import { useAuth } from "./auth-context/auth.context";
import { useHistory, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory();
  let { user, setUser } = useAuth();
  const localUser = JSON.parse(localStorage.getItem("user"))?.data?.user
  // console.log(localUser?.data?.user, user)

  if (!user & localUser) {
    setUser(localUser)
  }

  if ((!user || !user.token || user.token === "") & !localUser) {
    // history.push("/auth/signin");
    toast.error("You must be logged in");
    return <Redirect to="/login" {...rest} />;
  } else {
    return <Route {...rest} />;
  }
};
