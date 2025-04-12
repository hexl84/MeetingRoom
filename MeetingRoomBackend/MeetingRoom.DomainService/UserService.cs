using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;

namespace MeetingRoom.DomainService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void AddUser(UserRequest request)
        {
            var existUser = _userRepository.GetByName(request.Name);
            if (existUser != null)
            {
                throw new Exception("User already exists");
            }

            var newUser = Domain.User.Create(request.Name, request.Email, request.Phone, request.RoleId);
            _userRepository.Add(newUser);

        }

        public void DeleteUser(UserRequest request)
        {
            var existUser = _userRepository.Get(request.UserId);
            if (existUser == null)
            {
                throw new Exception("User not exists");
            }

            _userRepository.Delete(request.UserId);
        }

        public void EditUser(UserRequest request)
        {
            var existUser = _userRepository.Get(request.UserId);
            if (existUser == null)
            {
                throw new Exception("User not exists");
            }

            existUser.Update(request.Name, request.Email, request.Phone, request.RoleId);
            _userRepository.Update(existUser);  
        }
    }
}
