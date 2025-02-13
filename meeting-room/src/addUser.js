import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

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
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <h1>Add User</h1>
      <div>
        <TextField
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
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="phone"
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
    </form>
  );
}
