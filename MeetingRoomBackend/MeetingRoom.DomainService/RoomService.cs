using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;

namespace MeetingRoom.DomainService
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public void AddRoom(RoomRequest request)
        {
            var existRoom = _roomRepository.GetByName(request.Name);
            if (existRoom != null)
            {
                throw new Exception("Room already exists");
            }

            var newRoom = Domain.Room.Create(request.Name, request.Capacity, request.Status, request.Type, request.Comment);
            _roomRepository.Add(newRoom);
        }

        public void DeleteRoom(RoomRequest request)
        {
            var existRoom = _roomRepository.Get(request.RoomId);
            if (existRoom == null)
            {
                throw new Exception("Room not found");
            }

            throw new NotImplementedException();
        }

        public void EditRoom(RoomRequest request)
        {
            var existRoom = _roomRepository.Get(request.RoomId);
            if (existRoom == null)
            {
                throw new Exception("Room not found");
            }

            existRoom.Update(request.Name, request.Capacity, request.Status, request.Type, request.Comment);

            _roomRepository.Update(existRoom);
        }
    }
}
