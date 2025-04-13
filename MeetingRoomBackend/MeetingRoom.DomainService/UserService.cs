using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MeetingRoom.DomainService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly MeetingRoomContext _context;

        public UserService(IUserRepository userRepository, MeetingRoomContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        public void AddUser(UserRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.GetByName(request.Name);
                if (existUser != null)
                {
                    throw new Exception("User already exists");
                }

                var newUser = Domain.User.Create(request.Name, request.Email, request.Phone, request.RoleId, request.Password);
                _userRepository.Add(newUser);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public void EditUser(UserRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.Get(request.UserId);
                if (existUser == null)
                {
                    throw new Exception("User not exists");
                }

                existUser.Update(request.Name, request.Email, request.Phone, request.RoleId, request.Password);
                _userRepository.Update(existUser);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public void DeleteUser(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.Get(id);
                if (existUser == null)
                {
                    throw new Exception("User not exists");
                }

                _userRepository.Delete(id);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public UserResponse Login(LoginRequest loginRequest)
        {
            try
            {
                var existUser = _userRepository.GetByEmailAndPassword(loginRequest.Email, loginRequest.Password);
                if (existUser == null)
                {
                    throw new Exception("Invalid email or password");
                }

                // Generate JWT Token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("MeetingRoom"); 
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, existUser.UserID.ToString()),
                        new Claim(ClaimTypes.Name, existUser.Name),
                        new Claim(ClaimTypes.Email, existUser.Email),
                        new Claim(ClaimTypes.Role, existUser.RoleId.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), 
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return new UserResponse
                {
                    UserId = existUser.UserID,
                    Name = existUser.Name,
                    Email = existUser.Email,
                    Phone = existUser.Phone,
                    RoleId = existUser.RoleId,
                    Token = tokenString
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
