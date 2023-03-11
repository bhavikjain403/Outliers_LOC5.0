import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
// import { Box } from "tabler-icons-react";
import Typography from "@mui/material/Typography";
import { FormControlLabel } from "@mui/material";
// import { Checkbox } from "tabler-icons-react";
import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";

// import { setIsLoggedIn, setSingleUser } from "../../Redux/userSlice";
// import { RootState } from "../../Redux/store";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// import signInImage from "assets/img/signInImage.png";

import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();
  const { user, setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Login(formData)
      .then((response) => {
        if (response.data) {
          return setProfile(response);
        } else {
          setError(response.data.msg);
        }
      })
      .catch((error) => {
        if (error.response) {
          return setError(error.response.data.msg);
        }
        return setError("There has been an error.");
      });
  };

  const setProfile = (response) => {
    console.log("setting profile");
    let user = { ...response.data };
    console.log(user.data.token);
    user.data.user.token = user.data.token;
    setUser(user.data.user);
    user = JSON.stringify(user);
    localStorage.setItem("user", user);
    return history.push("/dashboard");
  };
  return (
    <Grid
      className="lead-capture-form mt-5"
      item
      xs={12}
      sm={8}
      md={5}
      elevation={6}
      square
      style={{ background: "transparent", color: "#0d6efd" }}
    >
      <Form onSubmit={handleSubmit}>
        <h5 style={{ textAlign: "center" }}>
          <strong>Sign In</strong>
        </h5>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        <Link href="/signup" variant="body2">
          {"Don't have an account? Signup"}
        </Link>
      </Form>
    </Grid>
  );
}

export default Login;
