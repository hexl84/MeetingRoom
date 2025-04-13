using MeetingBooking.DomainService;
using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.QueryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly IBookingQueryService _bookingQueryService;
        private readonly IBookingService _bookingService;

        public BookingController(ILogger<BookingController> logger, 
            IBookingQueryService bookingQueryService,
            IBookingService bookingService)
        {
            _logger = logger;
            _bookingQueryService = bookingQueryService;
            _bookingService = bookingService;
        }

        [HttpGet("{id}")]
        public BookingResponse GetRoom(int id)
        {
            return _bookingQueryService.GetBookingById(id);
        }

        [HttpGet("user/{id}")]
        public List<BookingResponse> GetAllBookingsByUserId(int id)
        {
            return _bookingQueryService.GetBookingsByUserId(id);
        }

        [HttpPost(Name = "AddBooking")]
        public void AddBooking([FromBody] BookingRequest bookingRequest)
        {
            _bookingService.AddBooking(bookingRequest);
        }

        [HttpPut(Name = "EditBooking")]
        public void EditBooking([FromBody] BookingRequest bookingRequest)
        {
            _bookingService.EditBooking(bookingRequest);
        }

        [HttpDelete("{id}")]
        public void DeleteBooking(int id)
        {
            _bookingService.DeleteBooking(id);
        }

    }
}
