using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;

namespace MeetingRoom.QueryService
{
    public class RoomQueryService: IRoomQueryService
    {
        private readonly MeetingRoomContext _context;

        public RoomQueryService(MeetingRoomContext context)
        {
            _context = context;
        }

        public RoomResponse GetRoomById(int id)
        {
            return _context.Rooms
                .Where(room => room.RoomID == id)
                .Select(room => new RoomResponse
                {
                    RoomId = room.RoomID,
                    Name = room.Name,
                    Capacity = room.Capacity,
                    Status = room.Status,
                    Type = room.Type,
                    Comment = room.Comment
                })
                .FirstOrDefault();
        }

        public List<RoomResponse> GetAllRooms()
        {
            return _context.Rooms
                .Select(room => new RoomResponse
                {
                    RoomId = room.RoomID,
                    Name = room.Name,
                    Capacity = room.Capacity,
                    Status = room.Status,
                    Type = room.Type,
                    Comment = room.Comment
                })
                .ToList();
        }
    }

}
