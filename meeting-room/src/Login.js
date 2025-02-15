import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/rooms");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <h1>Meeting Room</h1>
      <div>
        <TextField
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
