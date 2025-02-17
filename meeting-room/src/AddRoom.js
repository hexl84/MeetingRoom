import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import roomsJson from "./data/RoomsData.json";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AddRoomForm() {
  const { id } = useParams();
  const [isAdd, setIsAdd] = useState(true);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    capacity: 0,
    status: "",
    type: "",
    period: "",
    comment: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axios.get(
          "https://localhost:3001/api/rooms/" + id
        );
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        const matchRoom = roomsJson.find((room) => room.id == id);
        setFormData(matchRoom);

        setLoading(false);
      }
    };

    if (id > 0) {
      setIsAdd(false);
      getRoom();
    } else {
      setLoading(false);
    }
  }, [id]);

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

  if (loading) return <div>Loading...</div>;

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onReset={handleCancel}>
      {isAdd ? <h1>Add Room</h1> : <h1>Edit Room</h1>}
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          value={formData.name}
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
          value={formData.capacity}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <TextField
          fullWidth
          id="standard-basic"
          label="Status"
          variant="standard"
          name="status"
          value={formData.status}
          onChange={handleChange}
        /> */}
        <FormControlLabel
          control={
            <Checkbox
              name="status"
              defaultChecked
              value={formData.status}
              onChange={handleChange}
            />
          }
          label="Status"
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="standard-basic"
          label="Type"
          variant="standard"
          name="type"
          value={formData.type}
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
          value={formData.period}
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
          value={formData.comment}
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
