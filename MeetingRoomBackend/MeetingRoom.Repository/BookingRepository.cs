using MeetingRoom.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly MeetingRoomContext _context;
        public BookingRepository(MeetingRoomContext context)
        {
            _context = context;
        }

        public void Add(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public Booking Get(int id)
        {
            return _context.Bookings.Find(id);
        }

        public List<Booking> GetAll()
        {
            return _context.Bookings.ToList();
        }

        public void Update(Booking booking)
        {
            _context.Bookings.Update(booking);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var booking = Get(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
            }
        }

        IList<Booking> IRepository<Booking>.GetAll()
        {
            return GetAll();
        }
    }
}
