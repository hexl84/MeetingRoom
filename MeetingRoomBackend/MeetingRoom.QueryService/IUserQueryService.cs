using MeetingRoom.DTO.Response;

namespace MeetingRoom.QueryService
{
    public interface IUserQueryService
    {
        //UserResponse GetUserByIdAsync(int id);
        Task<UserResponse> GetUserByIdAsync(int id);
        List<UserResponse> GetAllUsers();
    }
}
