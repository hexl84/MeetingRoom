namespace MeetingRoom.Domain
{
    public class Room
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Comment { get; set; }
    }
}
