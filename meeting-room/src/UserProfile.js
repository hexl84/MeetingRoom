import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      setFormData(JSON.parse(loginUser)); // Parse the string back to an object
    } else {
      navigate("/login");
    }
  }, []);

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
    navigate("/users");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onReset={handleCancel}>
      <h1>Profile</h1>
      <div>
        <TextField
          required
          fullWidth
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          onChange={handleChange}
        />
      </div>
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
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="phone"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Role"
          variant="standard"
          name="role"
          disabled
        />
      </div>

      <Button variant="contained" type="submit">
        Save
      </Button>
      <Button variant="contained" type="reset">
        Cancel
      </Button>
    </form>
  );
}

export default UserProfileForm;
