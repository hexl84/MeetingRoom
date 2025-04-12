using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;
using Microsoft.EntityFrameworkCore;

namespace MeetingRoom.DomainService
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly MeetingRoomContext _context;

        public RoomService(IRoomRepository roomRepository, MeetingRoomContext context)
        {
            _roomRepository = roomRepository;
            _context = context;
        }

        public void AddRoom(RoomRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existRoom = _roomRepository.GetByName(request.Name);
                if (existRoom != null)
                {
                    throw new Exception("Room already exists");
                }

                var newRoom = Domain.Room.Create(request.Name, request.Capacity, request.Status, request.Type, request.Comment);
                _roomRepository.Add(newRoom);

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }


        }

        public void DeleteRoom(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existRoom = _roomRepository.Get(id);
                if (existRoom == null)
                {
                    throw new Exception("Room not found");
                }

                _roomRepository.Delete(id);

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }

        }

        public void EditRoom(RoomRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existRoom = _roomRepository.Get(request.RoomId);
                if (existRoom == null)
                {
                    throw new Exception("Room not found");
                }

                existRoom.Update(request.Name, request.Capacity, request.Status, request.Type, request.Comment);

                _roomRepository.Update(existRoom);

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
