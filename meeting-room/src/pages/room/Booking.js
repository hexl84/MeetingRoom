import * as React from "react";
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
import BookingModal from "../../components/BookingModal";

function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState();
  const [bookingDate, setBookingDate] = useState(dayjs());
  const defaulEvents = [
    {
      id: "1",
      title: "Event 1",
      start: "2025-02-24 10:00",
      end: "2025-02-24 11:00",
      startId: 3,
      endId: 5,
    },
    {
      id: "2",
      title: "Event 2",
      start: "2025-02-24 09:00",
      end: "2025-02-24 10:00",
      startId: 1,
      endId: 3,
    },
  ];

  const [events, setEvents] = useState(defaulEvents);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [isAddEvent, setIsAddEvent] = useState(true);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    locale: "en-US",
    selectedDate: dayjs().format("YYYY-MM-DD"),
    defaultView: viewWeek.name,
    dayBoundaries: {
      start: "09:00",
      end: "18:00",
    },
    views: [viewDay, viewWeek],
    plugins: [createEventModalPlugin(), eventsService],
    events: events,
    callbacks: {
      /**
       * Is called when clicking somewhere in the time grid of a week or day view
       * */
      onDoubleClickDateTime(dateTime) {
        setBookingDate(dayjs(dateTime));
        setIsAddEvent(true);
        setCurrentEvent({
          id: uuidv4(),
          title: "",
          participants: "",
          start: dateTime,
          end: dateTime,
          startId: 0,
          endId: 0,
        });
        console.log(currentEvent);
        setOpen(true);
      },
      onDoubleClickEvent(event) {
        // console.log("onDoubleClickEvent", event);
        setBookingDate(dayjs(event.start));
        setIsAddEvent(false);
        setCurrentEvent(event);
        setOpen(true);
      },
    },
  });

  const handleBookingModalCancel = (e) => {
    setCurrentEvent(null);
    setOpen(false);
  };

  const handleBookingModalDelete = (event) => {
    calendar.events.remove(event.id);
    setCurrentEvent(null);
    setOpen(false);
  };

  const handleBookingModalSave = (event) => {
    if (isAddEvent) {
      calendar.events.add(event);
    } else {
      calendar.events.update(event);
    }

    setCurrentEvent(null);
    setOpen(false);
  };

  useEffect(() => {
    // eventsService.getAll();

    const getPeriod = async () => {
      try {
        setCurrentRoom(roomsJson.find((room) => room.id == id));
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
      <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <BookingModal
        open={open}
        bookingDate={bookingDate}
        event={currentEvent}
        setEvent={setCurrentEvent}
        onCancel={handleBookingModalCancel}
        onSave={handleBookingModalSave}
        onDelete={handleBookingModalDelete}
      ></BookingModal>
    </div>
  );
}

export default BookingForm;
