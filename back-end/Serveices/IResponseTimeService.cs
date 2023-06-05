using ResponseTime.Models;

namespace ResponseTime.Services
{
    public interface IResponseTimeService
    {
        ResponseTimeModel GetResponseTimeInfo(string url);
    }
}
