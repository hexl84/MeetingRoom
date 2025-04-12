using MeetingRoom.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly MeetingRoomContext _context;
        public RoomRepository(MeetingRoomContext context)
        {
            _context = context;
        }

        public void Add(Room user)
        {
            _context.Rooms.Add(user);
            _context.SaveChanges();
        }

        public Room Get(Guid id)
        {
            return _context.Rooms.Find(id);
        }

        public IList<Room> GetAll()
        {
            return _context.Rooms.ToList();
        }

        public void Update(Room user)
        {
            _context.Rooms.Update(user);
            _context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var room = Get(id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                _context.SaveChanges();
            }
        }

    }
}
