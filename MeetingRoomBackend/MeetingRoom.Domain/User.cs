using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Domain
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; }    

        public static Domain.User Create(string name, string email, string phone, int roleId, string password)
        {
            var user = new User
            {
                Name = name,
                Email = email,
                Phone = phone,
                RoleId = roleId,
                Password = password
            };
            return user;
        }

        public void Update(string name, string email, string phone, int roleId, string password)
        {
            Name = name;
            Email = email;
            Phone = phone;
            RoleId = roleId;
            Password = password;
        }
    }
}
