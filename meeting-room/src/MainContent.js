import { Navigate, Route, Routes } from "react-router-dom";
import UsersTable from "./Users";
import React from "react";
import Rooms from "./Rooms";


export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersTable />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/" element={<Navigate to="/users" />}></Route>
      </Routes>
    </div>
  );
}
