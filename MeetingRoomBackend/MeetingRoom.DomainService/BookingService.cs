using MeetingRoom.Domain;
using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;

namespace MeetingBooking.DomainService
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IUserRepository _userRepository;
        private readonly MeetingRoomContext _context;

        public BookingService(IBookingRepository bookingRepository,
            IRoomRepository roomRepository,
            IUserRepository userRepository,
            MeetingRoomContext context)
        {
            _bookingRepository = bookingRepository;
            _roomRepository = roomRepository;
            _userRepository = userRepository;
            _context = context;
        }

        public void AddBooking(BookingRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var room = _roomRepository.Get(request.RoomId);
                if (room == null)
                {
                    throw new Exception("Room not exists");
                }

                var user = _userRepository.Get(request.UserId);

                var newBooking = Booking.Create(request.BookingDate, room, request.StartHour, request.EndHour, 
                    request.Title, request.Participants, user);
                _bookingRepository.Add(newBooking);

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }


        }

        public void DeleteBooking(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existBooking = _bookingRepository.Get(id);
                if (existBooking == null)
                {
                    throw new Exception("Booking not found");
                }

                _bookingRepository.Delete(id);

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }

        }

        public void EditBooking(BookingRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existBooking = _bookingRepository.Get(request.BookingId);
                if (existBooking == null)
                {
                    throw new Exception("Booking not found");
                }

                var room = _roomRepository.Get(request.RoomId);
                if (room == null)
                {
                    throw new Exception("Room not found");
                }

                existBooking.Update(request.BookingDate, room, request.StartHour, request.EndHour, request.Title, request.Participants);

                _bookingRepository.Update(existBooking);

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }


        }
    }
}
