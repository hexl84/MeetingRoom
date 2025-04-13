using MeetingRoom.DTO.Request;

namespace MeetingBooking.DomainService
{
    public interface IBookingService
    {
        void AddBooking(BookingRequest request);
        void EditBooking(BookingRequest request);
        void DeleteBooking(int Id);
    }
}
