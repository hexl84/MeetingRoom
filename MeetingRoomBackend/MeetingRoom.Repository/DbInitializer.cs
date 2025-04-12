using MeetingRoom.Domain;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Repository
{
    public static class DbInitializer
    {
        public static void Initialize(MeetingRoomContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
                new User{Name="admin",Email="admin@mail.com",Phone= "15912345678", RoleId = 1},
                new User{Name="Wangwu",Email="wangwu@mail.com",Phone= "15778961234", RoleId = 2},
            };
            foreach (User s in users)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();

            var rooms = new Room[]
            {
                new Room{Name="Room 1",Capacity=3, Status="Active", Type="Small", Comment=""},
                new Room{Name="Room 2",Capacity=5, Status="Active", Type="Middle", Comment=""},
            };
            foreach (Room s in rooms)
            {
                context.Rooms.Add(s);
            }
            context.SaveChanges();

        }
    }
}
