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

function createData(name, phone, email, roleName) {
  return { name, phone, email, roleName };
}

const rows = [
  createData("Zhangsan", 15912345678, "zhangsan@mail.com", "Normal"),
  createData("Lisi", 15312345678, "lisi@mail.com", "Normal"),
  createData("Wangwu", 15778961234, "wangwu@mail.com", "Normal"),
  createData("Guanyu", 17745467879, "guanyu@mail.com", "Normal"),
  createData("Machao", 17812124545, "machao@mail.com", "Normal"),
];

export default function UsersTable() {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/add-user");
  };

  return (
    <div>
      <h1>Users</h1>
      <Button variant="contained" onClick={() => handleClickAdd()}>
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.roleName}</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
