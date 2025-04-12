namespace MeetingRoom.Repository
{
    public interface IRepository<TEntity>
    {
        TEntity Get(Guid id);
        void Add(TEntity T);

    }
}
