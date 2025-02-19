import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function LoginForm({ setHasLogin }) {
  const navigate = useNavigate();
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
      setHasLogin(false);
    }
  }, []);

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
        setHasLogin(true);
      }

      navigate("/rooms");
    } catch (error) {
      console.error("Error posting data:", error);
      localStorage.setItem("loginUser", JSON.stringify(adminUser));
      setHasLogin(true);
      navigate("/rooms");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: 800 }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Meeting Room</h1>
          <div>
            <TextField
              required
              fullWidth
              id="standard-basic"
              label="Email"
              name="email"
              sx={{ mt: 2 }}
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
              sx={{ mt: 2 }}
              onChange={handleChange}
            />
          </div>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
