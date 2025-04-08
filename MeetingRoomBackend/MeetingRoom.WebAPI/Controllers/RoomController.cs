using MeetingRoom.DTO.Response;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomController : ControllerBase
    {

        private readonly ILogger<RoomController> _logger;

        public RoomController(ILogger<RoomController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRoom")]
        public IEnumerable<RoomResponse> Get()
        {
            throw new NotImplementedException();
        }
    }
}
