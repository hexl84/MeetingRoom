using MeetingRoom.Domain;
using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;
using Microsoft.EntityFrameworkCore;

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

        public async Task<UserResponse> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(b => b.UserID == id);
            if (user == null)
                return null;

            return new UserResponse
            {
                UserId = user.UserID,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                RoleId = user.RoleId
            };

            //return _context.Users
            //    .Where(user => user.UserID == id)
            //    .Select(user => new UserResponse
            //    {
            //        UserId = user.UserID,
            //        Name = user.Name,
            //        Email = user.Email,
            //        Phone = user.Phone,
            //        RoleId = user.RoleId
            //    })
            //    .FirstOrDefault();
        }
    }
}
