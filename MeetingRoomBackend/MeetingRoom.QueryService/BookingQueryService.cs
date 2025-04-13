using MeetingRoom.Domain;
using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;

namespace MeetingRoom.QueryService
{
    public class BookingQueryService : IBookingQueryService
    {
        private readonly MeetingRoomContext _context;

        public BookingQueryService(MeetingRoomContext context)
        {
            _context = context;
        }

        public BookingResponse GetBookingById(int id)
        {
            var booking = _context.Bookings.FirstOrDefault(x => x.BookingID == id);
            if (booking == null)
            {
                return null;
            }

            return new BookingResponse
            {
                BookingId = booking.BookingID,
                RoomId = booking.Room.RoomID,
                UserId = booking.User.UserID,
                StartHour = booking.StartHour,
                EndHour = booking.EndHour,
                Title = booking.Title,
                Participants = booking.Participants
            };
        }

        public List<BookingResponse> GetBookingsByUserId(int userId)
        {
            var bookings = _context.Bookings.Where(x => x.User.UserID == userId).ToList();

            return bookings.Select(booking => new BookingResponse
            {
                BookingId = booking.BookingID,
                RoomId = booking.Room.RoomID,
                UserId = booking.User.UserID,
                StartHour = booking.StartHour,
                EndHour = booking.EndHour,
                Title = booking.Title,
                Participants = booking.Participants
            }).ToList();

        }


    }
}
