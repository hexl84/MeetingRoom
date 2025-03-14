import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import usersJson from "../../data/UsersData.json";
import { useState, useEffect } from "react";

export default function UsersTable() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const rows = usersJson;
  useEffect(() => {
    const currentLoginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (currentLoginUser && currentLoginUser.roleId === 1) {
      setIsAdmin(true);
    } else {
      navigate("/401");
    }
  }, []);

  const handleClickAdd = () => {
    navigate("/add-user");
  };

  const handleClickEdit = (user) => {
    navigate("/edit-user/" + user.id);
  };

  return (
    <div>
      <h1>Users</h1>
      {isAdmin && (
        <Button
          variant="contained"
          onClick={() => handleClickAdd()}
          sx={{ float: "right", mr: 2 }}
        >
          Add
        </Button>
      )}

      <Paper sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
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
                <TableCell align="left">
                  <IconButton
                    color="secondary"
                    onClick={() => handleClickEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
