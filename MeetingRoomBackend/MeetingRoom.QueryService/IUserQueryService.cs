using MeetingRoom.DTO.Response;

namespace MeetingRoom.QueryService
{
    public interface IUserQueryService
    {
        UserResponse GetUserById(int id);
        List<UserResponse> GetAllUsers();
    }
}
