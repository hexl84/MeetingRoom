using MeetingRoom.DTO.Request;

namespace MeetingRoom.DomainService
{
    public interface IRoomService
    {
        void AddRoom(RoomRequest request);
        void EditRoom(RoomRequest request);
        void DeleteRoom(RoomRequest request);
    }
}
