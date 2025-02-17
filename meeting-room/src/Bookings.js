import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useEffect, useState } from "react";
import periodJson from "./data/PeriodData.json";
import roomsJson from "./data/RoomsData.json";
import Tooltip from "@mui/material/Tooltip";

function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [startPeriod, setStartPeriod] = useState([]);
  const [endPeriod, setEndPeriod] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  useEffect(() => {
    const getPeriod = async () => {
      try {
        setCurrentRoom(roomsJson.find((room) => room.id == id));
        setStartPeriod(periodJson.filter((period) => period.id < 18));
        setEndPeriod(periodJson.filter((period) => period.id > 1));
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getPeriod();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Booking {currentRoom.name}</h1>
    </div>
  );
}

export default BookingForm;
