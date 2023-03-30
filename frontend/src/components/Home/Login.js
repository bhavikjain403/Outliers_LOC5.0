import Axios from "axios";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "tabler-icons-react";
import Typography from "@mui/material/Typography";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";

// import { setIsLoggedIn, setSingleUser } from "../../Redux/userSlice";
// import { RootState } from "../../Redux/store";
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();
  const { user, setUser } = useAuth();
  // Chakra color mode
  const titleColor = "teal.300";
  const textColor = "gray.400";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id=toast.loading("Signing in...")
    AuthApi.Login(formData)
      .then((response) => {
        if (response.data) {
          toast.update(id, { render: "Signed in!", type: "success", isLoading: false, autoClose: 3000 });
          return setProfile(response);
        } else {
          setError(response.data.msg);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.update(id, { render: "Some error has occured. Please check your email and password.", type: "error", isLoading: false, autoClose: 3000 });
          return setError(error.response.data.msg);
        }
        return setError("There has been an error.");
      })
    //   ,{
    //     pending: 'Signing in...',
    //     success: 'Signed in!',
    //     error: 'Some error has occured',
    //   }
    // )
  };

  const setProfile = (response) => {
    console.log("setting profile");
    let user = { ...response.data };
    console.log(user.data.token);
    user.data.user.token = user.data.token;
    setUser(user.data.user);
    user = JSON.stringify(user);
    localStorage.setItem("user", user);
    return history.push("/admin/dashboard");
  };

  return (
    <Grid className="lead-capture-form mt-5" item xs={12} sm={8} md={5} elevation={6} square style={{ background:"transparent", color:"#0d6efd" }}>
      <Form>
        <h5 style={{ textAlign:"center" }} className="mb-4"><strong>Sign In</strong></h5>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" id="email" name="email" onChange={handleChange} value={formData?.email} required/>
        </Form.Group>

        <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="password" name="password" onChange={handleChange} value={formData?.password} required/>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit}>
          Sign In
        </Button>
        <Link href="/#/signup" variant="body2">
          {"Don't have an account? Signup"}
        </Link>
      </Form>
    </Grid>
  );
}
