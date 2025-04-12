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
            var room = _context.Rooms
                .FirstOrDefault(room => room.RoomID == id);

            if (room == null)
            {
                return null;
            }

            return new RoomResponse
            {
                RoomId = room.RoomID,
                Name = room.Name,
                Capacity = room.Capacity,
                Status = room.Status,
                Type = room.Type,
                Comment = room.Comment
            };
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
