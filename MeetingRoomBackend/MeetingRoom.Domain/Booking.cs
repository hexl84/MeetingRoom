namespace MeetingRoom.Domain
{
    public class Booking
    {
        public int BookingID { get; set; }
        public DateTime BookingDate { get; set; }
        public Room Room { get; set; }
        public Decimal StartHour { get; set; }
        public Decimal EndHour { get; set; }
        public string Title { get; set; }
        public int Participants { get; set; }
        public User User { get; set; }

        public static Domain.Booking Create(DateTime bookingDate, Room room, Decimal startHour, 
            Decimal endHour, string title, int participants, User user)
        {
            var booking = new Booking
            {
                BookingDate = bookingDate,
                Room = room,
                StartHour = startHour,
                EndHour = endHour,
                Title = title,
                Participants = participants,
                User = user
            };
            return booking;
        }

        public void Update(DateTime bookingDate, Room room, Decimal startHour, Decimal endHour,
            string title, int participants)
        {
            BookingDate = bookingDate;
            Room = room;
            StartHour = startHour;
            EndHour = endHour;
            Title = title;
            Participants = participants;
        }
    }

}
