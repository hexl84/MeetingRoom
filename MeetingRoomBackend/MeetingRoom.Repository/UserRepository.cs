using MeetingRoom.Domain;

namespace MeetingRoom.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MeetingRoomContext _context;
        public UserRepository(MeetingRoomContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public User Get(Guid id)
        {
            return _context.Users.Find(id);
        }
        public IList<User> GetAll()
        {
            return _context.Users.ToList();
        }
        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
        public void Delete(Guid id)
        {
            var user = Get(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}
