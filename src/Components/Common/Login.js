import { Avatar, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Login.css";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet";
import axios from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/authHooks";
import Loading from "./Loading";
import { toast } from "react-toastify";

const Login = (props) => {
  const authContext = useAuth();
  const navigate = useNavigate();

  // const cookies = new Cookies();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = () => {
    setLoading(true);

    if (mobile.length !== 11) {
      toast.error("মোবাইল নম্বর সঠিক নয়");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("পাসওয়ার্ড দিন");
      setLoading(false);
      return;
    }
    axios
      .post("/api/login/", {
        phone_number: "+88" + mobile,
        password: password,
      })
      .then((result) => {
        setLoading(false);
        localStorage.setItem("jwt", result.data.jwt);
        localStorage.setItem("role", result.data.info.role);
        toast.success("লগইন সফল হয়েছে");

        authContext.setToken(result.data.jwt);
        if (localStorage.getItem("jwt")) {
          if (result.data.info.role === "Admin") {
            window.location.replace(
              `${axios.defaults.baseURL}/admin/dashboard`
            );
          } else {
            navigate("/");
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // alert(error.response.data.detail);
          toast.error(error.response.data.detail);
        } else if (error.request) {
          // The request was made but no response was received
          alert(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error", error.detail);
        }
        setLoading(false);
      });
  };

  return (
    <Grid
      className="login_up_dummy_div"
      style={{ marginLeft: authContext.marginDiv ? "155px" : "50px" }}
    >
      <Helmet>
        <title>লগইন</title>
      </Helmet>
      <Paper elevation={20} className="login_up_content">
        <Grid align="center" style={{ display: "flex", marginTop: "-10px" }}>
          <Avatar className="avatar_style">
            <AddCircleOutlineOutlined />
          </Avatar>
          <h5 style={{ padding: "10px" }}>লগইন</h5>
        </Grid>
        <form>
          <TextField
            required={true}
            fullWidth
            label="১১ ডিজিটের নাম্বার দিতে হবে"
            variant="outlined"
            className="text_field"
            value={mobile}
            onChange={handleMobile}
            inputProps={{ style: { height: "15px" } }}
          />
          <TextField
            required={true}
            fullWidth
            type="password"
            label="পাসওয়ার্ড"
            variant="outlined"
            className="text_field"
            value={password}
            onChange={handlePassword}
            inputProps={{ style: { height: "15px" } }}
          />
          {loading ? (
            <Loading />
          ) : (
            <>
              <Button
                type={"submit"}
                variant="contained"
                className="text_field_login"
                onClick={handleApi}
              >
                লগইন
              </Button>
              <Link to="/forgot" className="btn btn-lg btn-block">
                পাসওয়ার্ড ভুলে গেছেন ?
              </Link>
            </>
          )}
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
