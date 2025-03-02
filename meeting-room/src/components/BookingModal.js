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
import periodJson from "../data/PeriodData.json";
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

function BookingModal(props) {
  const { open, bookingDate, event, setEvent, onCancel, onSave, onDelete } =
    props;

  const [startPeriods, setStartPeriods] = useState(
    periodJson.filter((period) => period.id < 19)
  );
  const [endPeriods, setEndPeriods] = useState(
    periodJson.filter((period) => period.id > 1)
  );
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");

  useEffect(() => {
    // const initEvent = async () => {
    //   try {
    //     if (event) {
    //       setTitle(event.title);
    //       setParticipants(event.participants);
    //       const startHour = dayjs(event.start).format("HH:mm");
    //       const endHour = dayjs(event.end).format("HH:mm");
    //       const startIndex = periodJson.find(
    //         (period) => period.timestamp === startHour
    //       ).id;
    //       const endIndex = periodJson.find(
    //         (period) => period.timestamp === endHour
    //       ).id;
    //       setStart(startIndex);
    //       setEnd(endIndex);
    //     } else {
    //       setEvent({
    //         title: "",
    //         participants: "",
    //         start: dayjs(event.start),
    //         end: dayjs(event.end),
    //       });
    //     }
    //   } catch (error) {
    //     console.log("Error:", error);
    //   }
    // };
    // initEvent();
  }, []);

  const handleStartChange = (e) => {
    // setStart(e.target.value);
    setEvent({ ...event, ["startId"]: e.target.value });
    setEndPeriods(periodJson.filter((period) => period.id > e.target.value));
  };
  const handleEndChange = (e) => {
    setEvent({ ...event, ["endId"]: e.target.value });
  };

  const handleTitleChange = (e) => {
    // setTitle(e.target.value);
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleParticipantsChange = (e) => {
    // setParticipants(e.target.value);
    setEvent({ ...event, ["participants"]: e.target.value });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(event);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    const startHour = startPeriods.find(
      (period) => period.id == event.startId
    ).timestamp;
    const endHour = endPeriods.find(
      (period) => period.id == event.endId
    ).timestamp;

    const newEvent = {
      id: event.id,
      title: event.title,
      participants: event.participants,
      start: bookingDate.format("YYYY-MM-DD") + " " + startHour,
      end: bookingDate.format("YYYY-MM-DD") + " " + endHour,
      startId: event.startId,
      endId: event.endId,
    };
    setEvent(newEvent);
    onSave(newEvent);
  };

  return (
    <Modal
      open={open}
      onClose={handleCancelClick}
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
            value={event?.title}
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
            value={event?.participants}
            sx={{ mb: 2 }}
            required
            onChange={handleParticipantsChange}
          />
        </div>
        <InputLabel id="select-start-label">Start</InputLabel>
        <Select
          fullWidth
          labelId="select-start-label"
          id="start-select"
          value={event?.startId}
          label="Start"
          name="start"
          required
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
          value={event?.endId}
          label="End"
          name="end"
          required
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
  );
}

export default BookingModal;
