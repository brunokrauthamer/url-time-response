using System.Collections.Generic;
using ResponseTime.Models;

namespace ResponseTime.Repositories
{
    static public class UserRepository
    {
        public static User Get(string username, string password)
        {
            var users = new List<User>();
            users.Add(new User { Id = 1, Username = "jaqueline", Password = "jaqueline_password" });
            users.Add(new User { Id = 2, Username = "leandro", Password = "leando_password" });
            users.Add(new User { Id = 3, Username = "talita", Password = "talita_password" });
            users.Add(new User { Id = 4, Username = "bruno", Password = "bruno_password" });
            
            return users.Find(user => user.Username == username && user.Password == password);
        }
    }
}