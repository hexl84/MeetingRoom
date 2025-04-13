using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;

namespace MeetingRoom.DomainService
{
    public interface IUserService
    {
        void AddUser(UserRequest request);
        void EditUser(UserRequest request);
        void DeleteUser(int id);
        UserResponse Login(LoginRequest request);
    }
}
