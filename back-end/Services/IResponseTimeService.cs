using ResponseTime.Models;

namespace ResponseTime.Services
{
    // Criando a interface para a classe ResponseTimeService
    public interface IResponseTimeService
    {
        ResponseTimeModel GetResponseTimeInfo(string url);
    }
}
