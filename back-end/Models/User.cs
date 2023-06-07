namespace ResponseTime.Models
{
    // Modelo da informação de usuário armazenada no servidor
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
    // Modelo dos dados recebidos pela API para Login
    public class UserCredentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}