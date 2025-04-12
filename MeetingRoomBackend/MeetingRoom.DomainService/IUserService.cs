using MeetingRoom.DTO.Request;

namespace MeetingRoom.DomainService
{
    public interface IUserService
    {
        void AddUser(UserRequest request);
        void EditUser(UserRequest request);
        void DeleteUser(int id);
    }
}
