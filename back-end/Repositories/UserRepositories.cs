using System.Collections.Generic;
using TimeResponse.Models;

namespace TimeResponse.Repositories
{
    static public class UserRepository
    {
        public static User Get(string username, string password)
        {
            var users = new List<User>();
            users.Add(new User { id = 1, Username = "jaqueline", Password = "jaqueline_password" });
            users.Add(new User { id = 2, Username = "leandro", Password = "leando_password" });
            users.Add(new User { id = 3, Username = "talita", Password = "talita_password" });
            users.Add(new User { id = 4, Username = "bruno", Password = "bruno_password" });
            
            return users.Find(user => user.Username == username && user.Password == password);
        }
    }
}