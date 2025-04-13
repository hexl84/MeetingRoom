using MeetingRoom.Domain;

namespace MeetingRoom.Repository
{
    public interface IUserRepository : IRepository<Domain.User>
    {
        User GetByName(string name);
        User GetByEmailAndPassword(string email, string password);
    }
}
