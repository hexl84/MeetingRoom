using MeetingRoom.DTO.Response;

namespace MeetingRoom.QueryService
{
    public interface IRoomQueryService
    {
        RoomResponse GetRoomById(int id);
        List<RoomResponse> GetAllRooms();
    }
}
