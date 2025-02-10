import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, date, room, period, title, participants) {
  return { id, date, room, period, title, participants};
}

let rows=[];

const OngoingBookings = [
  createData(1, '2025-02-10', 'Room 1', '14:00-15:00', 'code review', '张三，李四'),
  createData(2, '2025-02-11', 'Room 2', '15:00-16:00', 'sprint plan', '关羽，张飞'),
  createData(3, '2025-02-12', 'Room 3', '09:00-10:00', 'demo', '郭靖，杨过'),
];

const completeBookings = [
  createData(1, '2025-02-5', 'Room 1', '14:00-15:00', 'test 1', '张三，李四'),
  createData(2, '2025-02-6', 'Room 2', '15:00-16:00', 'test 2', '关羽，张飞'),
  createData(3, '2025-02-7', 'Room 3', '9:00-10:00', 'test3', '郭靖，杨过'),
];

const cancelledBookings = [
  createData(1, '2025-02-10', 'Room 1', '10:00-11:00', 'cancel 1', '张三，李四'),
  createData(2, '2025-02-11', 'Room 2', '14:00-15:00', 'cancel 2', '关羽，张飞'),
  createData(3, '2025-02-12', 'Room 3', '10:00-11:00', 'cancel 3', '郭靖，杨过'),
];

export default function BookHistoryTable(tabIndex) {
  switch(tabIndex){
    case 0:
      rows = OngoingBookings;
      break;
    case 1:
      rows = completeBookings;
      break;
    case 2:
      rows = cancelledBookings;
      break;
    default:
      rows = OngoingBookings;
      break;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Room</TableCell>
              <TableCell align="right">Period</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Participants</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.room}</TableCell>
                <TableCell align="right">{row.period}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.participants}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
