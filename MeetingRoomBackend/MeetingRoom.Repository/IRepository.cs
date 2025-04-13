namespace MeetingRoom.Repository
{
    public interface IRepository<TEntity>
    {
        TEntity Get(int id);
        IList<TEntity> GetAll();
        void Add(TEntity T);
        void Update(TEntity T);
        void Delete(int id);
    }
}
