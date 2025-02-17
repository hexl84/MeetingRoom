import { Navigate, Route, Routes } from "react-router-dom";
import UsersTable from "./Users";
import React from "react";
import RoomsTable from "./Rooms";
import BookingHistoriesTabs from "./BookHistory";
import AddUserForm from "./AddUser";
import AddRoomForm from "./AddRoom";
import LoginForm from "./Login";
import UserProfileForm from "./UserProfile";
import EditUserForm from "./EditUser";
import BookingForm from "./Booking";

export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/users" element={<UsersTable />}></Route>
        <Route path="/add-user" element={<AddUserForm />}></Route>
        <Route path="/edit-user/:id" element={<EditUserForm />}></Route>
        <Route path="/rooms" element={<RoomsTable />}></Route>
        <Route path="/add-room" element={<AddRoomForm />}></Route>
        <Route path="/edit-room/:id" element={<AddRoomForm />}></Route>
        <Route path="/booking-room/:id" element={<BookingForm />}></Route>
        <Route path="/profile" element={<UserProfileForm />}></Route>
        <Route
          path="/booking-histories"
          element={<BookingHistoriesTabs />}
        ></Route>
        <Route path="/" element={<Navigate to="/login" />}></Route>
      </Routes>
    </div>
  );
}
