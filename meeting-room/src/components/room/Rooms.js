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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useEffect, useState } from "react";
import roomsJson from "../../data/RoomsData.json";
import Tooltip from "@mui/material/Tooltip";
import { ClockIcon } from "@mui/x-date-pickers";

export default function RoomsTable() {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const rows = roomsJson;

  const handleClickAdd = () => {
    navigate("/add-room");
  };

  const handleClickEdit = (room) => {
    navigate("/edit-room/" + room.id);
  };

  const handleClickBooking = (room) => {
    navigate("/booking-room/" + room.id);
  };

  return (
    <div>
      <h1>Rooms</h1>
      {loginUser.roleId === 1 ? (
        <Button
          variant="contained"
          onClick={() => handleClickAdd()}
          sx={{ float: "right", mr: 2 }}
        >
          Add
        </Button>
      ) : (
        ""
      )}

      <Paper sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Room Capacity
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Period
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Comment
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
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
                <TableCell align="left">
                  <Tooltip title="Edit room">
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Book room">
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickBooking(row)}
                    >
                      <ClockIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
