import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import users from "../data/UsersData.json";

export default function LoginForm({ setLoginUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@mail.com",
    password: "123456",
  });

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      localStorage.removeItem("loginUser");
      setLoginUser(null);
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
        setLoginUser(res);
      }

      navigate("/rooms");
    } catch (error) {
      console.error("Error posting data:", error);
      const matchUser = users.find((x) => x.email === formData.email);
      if (!matchUser) {
        alert("User not found");
        setLoginUser(null);
        return;
      }
      localStorage.setItem("loginUser", JSON.stringify(matchUser));
      setLoginUser(matchUser);
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
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button variant="contained" type="submit" sx={{ mt: 2, mb: 6 }}>
            Login
          </Button>
          <div sx={{ mt: 6 }}>
            <span>
              admin@mail.com / 123456 , admin user
              <br />
              test@mail.com / 123456 , normal user <br />
            </span>
          </div>
        </form>
      </Box>
    </Container>
  );
}
