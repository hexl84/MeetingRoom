import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import usersJson from "../../data/UsersData.json";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function EditUserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    roleId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:3001/api/users/" + id
        );
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        const matchUser = usersJson.find((user) => user.id == id);
        setFormData(matchUser);

        setLoading(false);
      }
    };

    getUser();
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
    navigate("/users");
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(null);
    navigate("/users");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: 800 }}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h1>Edit User</h1>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              value={formData.name}
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
              value={formData.email}
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
              value={formData.phone}
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
                value={formData.roleId}
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

export default EditUserForm;
