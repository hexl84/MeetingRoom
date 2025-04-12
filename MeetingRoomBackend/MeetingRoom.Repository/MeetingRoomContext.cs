using MeetingRoom.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Repository
{
    public class MeetingRoomContext : DbContext
    {
        public DbSet<Domain.Room> Rooms { get; set; }
        public DbSet<Domain.User> Users { get; set; }

        public MeetingRoomContext(DbContextOptions<MeetingRoomContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>().ToTable("Room");
            modelBuilder.Entity<User>().ToTable("User");
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options
            .UseAsyncSeeding(async (context, _, cancellationToken) =>
            {
                var adminUser = await context.Set<User>().FirstOrDefaultAsync(b => b.Email == "admin@mail.com");
                if (adminUser == null)
                {
                    adminUser = User.Create("admin", "admin@mail.com", "15912345678", 1);
                    await context.Set<User>().AddAsync(adminUser);
                    await context.SaveChangesAsync();
                }

                var sampleRoom = await context.Set<Room>().FirstOrDefaultAsync(b => b.Name == "Room 1");
                if (sampleRoom == null)
                {
                    sampleRoom = Room.Create("Room 1", 4, "Active", "Samll", "");
                    await context.Set<Room>().AddAsync(sampleRoom);
                    await context.SaveChangesAsync();
                }
            });
        }

    }

}
