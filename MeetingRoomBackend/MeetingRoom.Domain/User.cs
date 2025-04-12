using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoom.Domain
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int RoleId { get; set; }

        public Domain.User Create(string name, string email, string phone, int roleId)
        {
            var user = new User
            {
                Name = name,
                Email = email,
                Phone = phone,
                RoleId = roleId
            };
            return user;
        }

        public void Update(string name, string email, string phone, int roleId)
        {
            Name = name;
            Email = email;
            Phone = phone;
            RoleId = roleId;
        }
    }
}
