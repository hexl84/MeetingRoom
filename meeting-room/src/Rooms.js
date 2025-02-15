import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function createData(id, name, capacity, status, type, period, comment) {
  return { id, name, capacity, status, type, period, comment };
}

const rows = [
  createData(1, "Room 1", 4, "free", "small", "", "小会议室"),
  createData(2, "Room 2", 6, "free", "middle", "", "中会议室"),
  createData(3, "Room 3", 10, "busy", "big", "", "大会议室"),
];

export default function RoomsTable() {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/add-room");
  };

  return (
    <div>
      <h1>Rooms</h1>
      <Button variant="contained" onClick={() => handleClickAdd()}>
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Room Capacity</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Period</TableCell>
              <TableCell align="left">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.capacity}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.period}</TableCell>
                <TableCell align="left">{row.comment}</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
