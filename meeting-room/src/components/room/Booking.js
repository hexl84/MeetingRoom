import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import periodJson from "../../data/PeriodData.json";
import roomsJson from "../../data/RoomsData.json";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'

function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [startPeriods, setStartPeriods] = useState([]);
  const [endPeriods, setEndPeriods] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [bookingDate, setBookingDate] = useState(dayjs());

  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2023-12-16',
        end: '2023-12-16',
      },
    ],
    plugins: [eventsService]
  })

  useEffect(() => {
    eventsService.getAll();
    
    const getPeriod = async () => {
      try {
        setCurrentRoom(roomsJson.find((room) => room.id == id));
        setStartPeriods(periodJson.filter((period) => period.id < 19));
        setEndPeriods(periodJson.filter((period) => period.id > 1));
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getPeriod();
  }, [id]);

  const handleStartChange = (e) => {
    console.log(e.target.value);
    setStart(e.target.value);
    setEndPeriods(periodJson.filter((period) => period.id > e.target.value));
  };
  const handleEndChange = (e) => {
    console.log(e.target.value);
    setEnd(e.target.value);
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate("/rooms");
  };
  const handleSaveClick = (e) => {
    e.preventDefault();
    navigate("/rooms");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Booking {currentRoom.name}</h1>
      <div>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Booking Date"
              value={bookingDate}
              onChange={(newDate) => setBookingDate(newDate)}
            />
          </LocalizationProvider>
          <InputLabel id="select-start-label">Start</InputLabel>
          <Select
            labelId="select-start-label"
            id="start-select"
            value={start}
            label="Role"
            name="role"
            onChange={handleStartChange}
          >
            {startPeriods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.timestamp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="select-end-label">End</InputLabel>
          <Select
            labelId="select-end-label"
            id="end-select"
            value={end}
            label="Role"
            name="role"
            onChange={handleEndChange}
          >
            {endPeriods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.timestamp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Button variant="contained" onClick={handleSaveClick}>
          Book
        </Button>
        <Button variant="contained" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
      <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
    </div>
  );
}

export default BookingForm;
