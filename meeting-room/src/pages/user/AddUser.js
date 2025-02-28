import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
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
    navigate("/users");
  };

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: 800 }}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h1>Add User</h1>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              sx={{ mb: 2 }}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              sx={{ mb: 2 }}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Phone"
              variant="standard"
              name="phone"
              sx={{ mb: 2 }}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                name="role"
                sx={{ mb: 2 }}
                onChange={handleChange}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Normal</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="contained" type="reset">
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
}
