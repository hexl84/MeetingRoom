namespace MeetingRoom.Repository
{
    public interface IRepository<TEntity>
    {
        TEntity Get(int id);
        void Add(TEntity T);
        void Update(TEntity T);
    }
}
