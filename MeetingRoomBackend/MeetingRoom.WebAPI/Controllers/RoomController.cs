using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.QueryService;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomController : ControllerBase
    {

        private readonly ILogger<RoomController> _logger;
        private readonly IRoomQueryService _roomQueryService;
        private readonly IRoomService _roomService;

        public RoomController(ILogger<RoomController> logger, IRoomQueryService roomQueryService, IRoomService roomService)
        {
            _logger = logger;
            _roomQueryService = roomQueryService;
            _roomService = roomService;
        }

        [HttpGet(Name = "GetRoom")]
        public RoomResponse Get(int id)
        {
            return _roomQueryService.GetRoomById(id);
        }

        [HttpGet(Name = "GetAllRooms")]
        public List<RoomResponse> GetAllRooms()
        {
            return _roomQueryService.GetAllRooms();
        }

        [HttpPost(Name = "AddRoom")]
        public void AddRoom([FromBody] RoomRequest room)
        {
            _roomService.AddRoom(room);
        }

        [HttpPut(Name = "EditRoom")]
        public void EditRoom([FromBody] RoomRequest room)
        {
            _roomService.EditRoom(room);
        }

        [HttpDelete(Name = "DeleteRoom")]
        public void DeleteRoom(int id)
        {
            _roomService.DeleteRoom(id);
        }

    }
}
