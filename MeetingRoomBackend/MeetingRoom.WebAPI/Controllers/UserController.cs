using MeetingRoom.DTO.Response;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetUser")]
        public IEnumerable<UserResponse> Get()
        {
            throw new NotImplementedException();
        }
    }
}
