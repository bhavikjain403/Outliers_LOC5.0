import axios from "axios";
import React, { useState } from "react";
import signInImage from "assets/img/incento.png";
import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
// import { setIsLoggedIn, setSingleUser } from "../../Redux/userSlice";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Signup() {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    company:"",
    password:""
  });
  const [error, setError] = useState("");

  const history = useHistory();
  const { user } = useAuth();

  const titleColor = "teal.300";
  const textColor = "gray.700";
  const bgColor = "white";
  const bgIcons = "teal.200";

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const id=toast.loading("Signing up...")
    if(formData.password.length<8 || formData.password.length>128) {
      toast.update(id, { render: "Password length should be between 8-128 characters", type: "error", isLoading: false, autoClose: 2000 });
      return setError("There has been an error.");
    }
    AuthApi.Register(formData).then(response => {
      if(response.data) {
        toast.update(id, { render: "Account created successfully! Please login.", type: "success", isLoading: false, autoClose: 3000 });
        return history.push("/login");
      } else {
        setError("There has been an error.");
      }
    }).catch(error => {
      if (error.response) {
        toast.update(id, { render: "Some error has occured.", type: "error", isLoading: false, autoClose: 3000 });
        return setError(error.response.data.msg);
      }
      return setError("There has been an error.");
    })
  }

  return (
    <Grid className="lead-capture-form mt-4" item xs={12} sm={8} md={5} elevation={6} square style={{ background:"transparent", color:"#0d6efd" }}>
      <Form>
        <h5 style={{ textAlign:"center" }} className="mb-4"><strong>Sign Up</strong></h5>
        <Form.Group className="mb-4">
          <Form.Control type="text" required id="name" name="name" onChange={handleChange} placeholder="Name"/>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control type="text" required id="company" name="company" onChange={handleChange} placeholder="Company Name"/>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control type="email" required id="email" name="email" onChange={handleChange} placeholder="Email"/>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control type="password" required id="password" name="password" onChange={handleChange} placeholder="Password"/>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
        <Link href="/#/login" variant="body2">
          {"Already have an account? Login"}
        </Link>
      </Form>
    </Grid>


  );
}
