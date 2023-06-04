namespace MyProject.Services
{
    public class MyService : IMyService
    {
        public string ConcatenateMessage(string message)
        {
            return "Sua mensagem é: " + message;
        }
    }
}