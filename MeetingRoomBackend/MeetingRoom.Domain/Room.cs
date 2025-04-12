namespace MeetingRoom.Domain
{
    public class Room
    {
        public int RoomID { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Comment { get; set; }

        public Domain.Room Create(string name, int capacity, string status, string type, string comment)
        {
            var room = new Room
            {
                Name = name,
                Capacity = capacity,
                Status = status,
                Type = type,
                Comment = comment
            };

            return room;
        }

        public void Update(string name, int capacity, string status, string type, string comment)
        {
            Name = name;
            Capacity = capacity;
            Status = status;
            Type = type;
            Comment = comment;
        }
    }

}
