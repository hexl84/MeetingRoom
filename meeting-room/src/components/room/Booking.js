import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import periodJson from "../../data/PeriodData.json";
import roomsJson from "../../data/RoomsData.json";
import dayjs from "dayjs";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { viewWeek, viewDay } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { v4 as uuidv4 } from "uuid";

import "@schedule-x/theme-default/dist/index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const defaulEvents = [
    {
      id: "1",
      title: "Event 1",
      start: "2025-02-23 10:00",
      end: "2025-02-23 11:00",
    },
    {
      id: "2",
      title: "Event 2",
      start: "2025-02-23 03:00",
      end: "2025-02-23 05:00",
    },
  ];

  const [events, setEvents] = useState([defaulEvents]);

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    locale: "en-US",
    selectedDate: "2025-02-23",
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek],
    plugins: [createEventModalPlugin(), eventsService],
    events: defaulEvents,
    callbacks: {
      /**
       * Is called when clicking somewhere in the time grid of a week or day view
       * */
      onDoubleClickDateTime(dateTime) {
        console.log("onDoubleClickDateTime", dateTime); // e.g. 2024-01-01 12:37
        handleOpenModal(dateTime);
        setBookingDate(dayjs(dateTime));
      },
    },
  });

  useEffect(() => {
    // eventsService.getAll();

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
    setStart(e.target.value);
    setEndPeriods(periodJson.filter((period) => period.id > e.target.value));
  };
  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleParticipantsChange = (e) => {
    setParticipants(e.target.value);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleSaveClick = (e) => {
    e.preventDefault();

    const startHour = startPeriods.find(
      (period) => period.id == start
    ).timestamp;
    const endHour = endPeriods.find((period) => period.id == end).timestamp;

    const newEvent = {
      id: uuidv4(),
      title: title,
      participants: participants,
      start: bookingDate.format("YYYY-MM-DD") + " " + startHour,
      end: bookingDate.format("YYYY-MM-DD") + " " + endHour,
    };

    console.log(newEvent);
    setEvents([...events, newEvent]);
    eventsService.add(newEvent);
    const test1 = eventsService.getAll();
    eventsService.set(defaulEvents);
    const test2 = eventsService.getAll();

    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Booking {currentRoom.name}</h1>
      <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              variant="standard"
              name="title"
              sx={{ mb: 2 }}
              required
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="standard-basic"
              label="Participants"
              variant="standard"
              name="participants"
              sx={{ mb: 2 }}
              onChange={handleParticipantsChange}
            />
          </div>
          <InputLabel id="select-start-label">Start</InputLabel>
          <Select
            fullWidth
            labelId="select-start-label"
            id="start-select"
            value={start}
            label="Start"
            name="start"
            onChange={handleStartChange}
          >
            {startPeriods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.timestamp}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="select-end-label">End</InputLabel>
          <Select
            fullWidth
            labelId="select-end-label"
            id="end-select"
            value={end}
            label="End"
            name="end"
            onChange={handleEndChange}
          >
            {endPeriods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.timestamp}
              </MenuItem>
            ))}
          </Select>
          <div>
            <Button
              variant="contained"
              onClick={handleDeleteClick}
              sx={{ mt: 4 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              sx={{ mt: 4, marginLeft: 2, float: "right" }}
            >
              Book
            </Button>
            <Button
              variant="contained"
              onClick={handleCancelClick}
              sx={{ mt: 4, marginLeft: 2, float: "right" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BookingForm;
