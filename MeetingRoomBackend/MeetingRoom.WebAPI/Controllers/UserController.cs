using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.QueryService;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly IUserQueryService _userQueryService;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserQueryService userQueryService, IUserService userService)
        {
            _logger = logger;
            _userQueryService = userQueryService;
            _userService = userService;
        }

        [HttpGet(Name = "GetAllUsers")]
        public List<UserResponse> GetAllUsers()
        {
            return _userQueryService.GetAllUsers();
        }

        [HttpGet(Name = "GetUser")]
        public UserResponse GetUser(int id)
        {
            return _userQueryService.GetUserById(id);
        }

        [HttpPost(Name = "AddUser")]
        public void AddUser([FromBody] UserRequest user)
        {
            _userService.AddUser(user);
        }

        [HttpPut(Name = "EditUser")]
        public void EditUser([FromBody] UserRequest user)
        {
            _userService.EditUser(user);
        }

        [HttpDelete(Name = "DeleteUser")]
        public void DeleteUser(int id)
        {
            _userService.DeleteUser(id);
        }
    }
}
