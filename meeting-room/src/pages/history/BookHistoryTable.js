import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, date, room, period, title, participants) {
  return { id, date, room, period, title, participants };
}

const ongoingBookings = [
  createData(
    1,
    "2025-02-10",
    "Room 1",
    "14:00-15:00",
    "code review",
    "张三，李四"
  ),
  createData(
    2,
    "2025-02-11",
    "Room 2",
    "15:00-16:00",
    "sprint plan",
    "关羽，张飞"
  ),
  createData(3, "2025-02-12", "Room 3", "09:00-10:00", "demo", "郭靖，杨过"),
];

const completeBookings = [
  createData(4, "2025-02-5", "Room 1", "14:00-15:00", "test 1", "张三，李四"),
  createData(5, "2025-02-6", "Room 2", "15:00-16:00", "test 2", "关羽，张飞"),
  createData(6, "2025-02-7", "Room 3", "9:00-10:00", "test3", "郭靖，杨过"),
];

const cancelledBookings = [
  createData(
    7,
    "2025-02-10",
    "Room 1",
    "10:00-11:00",
    "cancel 1",
    "张三，李四"
  ),
  createData(
    8,
    "2025-02-11",
    "Room 2",
    "14:00-15:00",
    "cancel 2",
    "关羽，张飞"
  ),
  createData(
    9,
    "2025-02-12",
    "Room 3",
    "10:00-11:00",
    "cancel 3",
    "郭靖，杨过"
  ),
];

export default function BookHistoryTable({ tabIndex, currentUser }) {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    switch (tabIndex) {
      case 0:
        setHistories(ongoingBookings);
        break;
      case 1:
        setHistories(completeBookings);
        break;
      case 2:
        setHistories(cancelledBookings);
        break;
      default:
        setHistories(ongoingBookings);
        break;
    }
  }, [tabIndex]);

  function handleClickCancel(history) {
    console.log("Cancel booking:", history);
  }

  return (
    <div>
      <Paper sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Room
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Period
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Participants
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                {tabIndex === 0 && "Action"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(histories) ? histories : []).map((history) => (
              <TableRow
                key={history.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {history.date}
                </TableCell>
                <TableCell align="left">{history.room}</TableCell>
                <TableCell align="left">{history.period}</TableCell>
                <TableCell align="left">{history.title}</TableCell>
                <TableCell align="left">{history.participants}</TableCell>
                <TableCell align="left">
                  {tabIndex === 0 && (
                    <Tooltip title="Cancel book room">
                      <IconButton
                        color="secondary"
                        onClick={() => handleClickCancel(history)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
