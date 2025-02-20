import { Navigate, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UsersTable from "./components/user/Users";
import React from "react";
import RoomsTable from "./components/room/Rooms";
import BookingHistoriesTabs from "./components/room/BookHistory";
import AddUserForm from "./components/user/AddUser";
import AddRoomForm from "./AddRoom";
import LoginForm from "./components/Login";
import UserProfileForm from "./components/user/UserProfile";
import EditUserForm from "./components/user/EditUser";
import BookingForm from "./components/room/Booking";
import { useEffect } from "react";
import NoAuth from "./components/NoAuth";

export default function MainContent({ setLoginUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    if (!loginUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setLoginUser={setLoginUser} />}
        ></Route>
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
        <Route path="/401" element={<NoAuth />}></Route>
      </Routes>
    </div>
  );
}
