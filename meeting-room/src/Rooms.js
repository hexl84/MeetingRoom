import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, name, usersCount, status, type, period, comment) {
  return { id, name, usersCount, status, type, period, comment };
}

const rows = [
  createData(1, 'Room 1', 4, 'free', 'small', '', '小会议室'),
  createData(2, 'Room 2', 6, 'free', 'middle', '', '中会议室'),
  createData(3, 'Room 3', 10, 'busy', 'big', '', '大会议室')
];

export default function RoomsTable() {
  return (
    <div>
      <h1>Rooms</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Users count</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Period</TableCell>
              <TableCell align="right">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.usersCount}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.period}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
