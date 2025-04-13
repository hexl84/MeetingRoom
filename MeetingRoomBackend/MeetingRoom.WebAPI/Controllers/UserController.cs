using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.QueryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
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

        [HttpGet("{id}")]
        public async Task<UserResponse> GetUser(int id)
        {
            return await _userQueryService.GetUserByIdAsync(id);
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

        [HttpPost("login")]
        [AllowAnonymous]
        public UserResponse Login([FromBody] LoginRequest request)
        {
            return _userService.Login(request);
        }
    }
}
