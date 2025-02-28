import { Navigate, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import UsersTable from "../pages/user/Users";
import AddUserForm from "../pages/user/AddUser";
import EditUserForm from "../pages/user/EditUser";
import UserProfileForm from "../pages/user/UserProfile";
import RoomsTable from "../pages/room/Rooms";
import AddRoomForm from "../pages/room/AddRoom";
import BookingForm from "../pages/room/Booking";
import BookingHistoriesTabs from "../pages/history/BookHistory";
import LoginForm from "../pages/login/Login";
import { useEffect } from "react";
import NoAuth from "../components/NoAuth";

export default function RouteConfig({ setLoginUser }) {
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
