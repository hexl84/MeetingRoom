using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;

namespace MeetingRoom.QueryService
{
    public class UserQueryService : IUserQueryService
    {
        private readonly MeetingRoomContext _context;

        public UserQueryService(MeetingRoomContext context)
        {
            _context = context;
        }

        public List<UserResponse> GetAllUsers()
        {
            return _context.Users
                .Select(user => new UserResponse
                {
                    UserId = user.UserID,
                    Name = user.Name,
                    Email = user.Email,
                    Phone = user.Phone,
                    RoleId = user.RoleId
                })
                .ToList();
        }

        public UserResponse GetUserById(int id)
        {
            return _context.Users
                .Where(user => user.UserID == id)
                .Select(user => new UserResponse
                {
                    UserId = user.UserID,
                    Name = user.Name,
                    Email = user.Email,
                    Phone = user.Phone,
                    RoleId = user.RoleId
                })
                .FirstOrDefault();
        }
    }
}
