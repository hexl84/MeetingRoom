import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function BookHistoryTable({histories}) {

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Room</TableCell>
              <TableCell align="left">Period</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Participants</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(histories) ?histories: []).map((history) => (
              <TableRow
                key={history.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {history.date}
                </TableCell>
                <TableCell align="left">{history.room}</TableCell>
                <TableCell align="left">{history.period}</TableCell>
                <TableCell align="left">{history.title}</TableCell>
                <TableCell align="left">{history.participants}</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
