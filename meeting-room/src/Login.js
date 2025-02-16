import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const adminUser = {
    id: 1,
    email: "admin@qq.com",
    phone: "12355667788",
    role: "Admin",
    roleId: 1,
  };
  const normalUser = {
    id: 2,
    email: "test@qq.com",
    phone: "15378964545",
    role: "Normal",
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      localStorage.removeItem("loginUser");
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const userLoginRequest = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await axios.post(
        "https://localhost:3001/api/users/login",
        userLoginRequest
      );
      if (res) {
        localStorage.setItem("loginUser", JSON.stringify(res));
      }

      navigate("/rooms");
    } catch (error) {
      console.error("Error posting data:", error);
      localStorage.setItem("loginUser", JSON.stringify(adminUser));
      navigate("/rooms");
    }
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid xs={4}>
    //       <Paper sx={{ textAlign: "center" }}></Paper>
    //     </Grid>
    //     <Grid xs={8}>
    //       <Paper sx={{ textAlign: "center" }}></Paper>
    //     </Grid>
    //     <Grid xs={4}>
    //       <Paper sx={{ textAlign: "center" }}></Paper>
    //     </Grid>
    //   </Grid>
    // </Box>

    <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Meeting Room</h1>
      <div>
        <TextField
          required
          fullWidth
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          required
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
