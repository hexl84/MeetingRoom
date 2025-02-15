import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AddRoomForm() {
  const [formData, setFormData] = useState({
    name: "",
    capacity: 0,
    status: "",
    type: "",
    period: "",
    comment: "",
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/rooms");
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <h1>Add Room</h1>
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
          label="Capacity"
          variant="standard"
          type="number"
          name="capacity"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Status"
          variant="standard"
          name="status"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Type"
          variant="standard"
          name="type"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Period"
          variant="standard"
          name="period"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Comment"
          variant="standard"
          name="comment"
          onChange={handleChange}
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
