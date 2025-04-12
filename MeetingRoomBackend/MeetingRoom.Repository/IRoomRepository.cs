using MeetingRoom.Domain;

namespace MeetingRoom.Repository
{
    public interface IRoomRepository : IRepository<Domain.Room>
    {
        Room GetByName(string name);
    }
}
