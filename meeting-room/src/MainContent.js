import { Navigate, Route, Routes } from "react-router-dom";
import UsersTable from "./Users";
import React from "react";
import RoomsTable from "./Rooms";
import BookingHistoriesTabs from "./BookHistory";
import AddUserForm from "./addUser";


export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersTable />}></Route>
        <Route path="/add-user" element={<AddUserForm />}></Route>
        <Route path="/rooms" element={<RoomsTable />}></Route>
        <Route path="/booking-histories" element={<BookingHistoriesTabs />}></Route>
        <Route path="/" element={<Navigate to="/users" />}></Route>
      </Routes>
    </div>
  );
}
