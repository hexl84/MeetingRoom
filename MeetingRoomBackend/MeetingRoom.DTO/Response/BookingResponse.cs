using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.DTO.Response
{
    public class BookingResponse
    {
        public BookingResponse() { }

        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public int RoomId { get; set; }
        public Decimal StartHour { get; set; }
        public Decimal EndHour { get; set; }
        public string Title { get; set; }
        public int Participants { get; set; }
    }
}
