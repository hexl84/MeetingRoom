import { Navigate, Route, Routes } from "react-router-dom";
import UsersTable from "./Users";
import React from "react";
import RoomsTable from "./Rooms";
import BookingHistoriesTabs from "./BookHistory";
import AddUserForm from "./AddUser";
import AddRoomForm from "./AddRoom";
import LoginForm from "./Login";

export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/users" element={<UsersTable />}></Route>
        <Route path="/add-user" element={<AddUserForm />}></Route>
        <Route path="/rooms" element={<RoomsTable />}></Route>
        <Route path="/add-room" element={<AddRoomForm />}></Route>
        <Route
          path="/booking-histories"
          element={<BookingHistoriesTabs />}
        ></Route>
        <Route path="/" element={<Navigate to="/rooms" />}></Route>
      </Routes>
    </div>
  );
}
