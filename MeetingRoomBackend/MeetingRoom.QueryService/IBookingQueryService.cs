using MeetingRoom.DTO.Response;

namespace MeetingRoom.QueryService
{
    public interface IBookingQueryService
    {
        BookingResponse GetBookingById(int id);
        List<BookingResponse> GetBookingsByUserId(int userId);
    }
}
