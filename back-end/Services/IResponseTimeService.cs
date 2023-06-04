namespace ResponseTime.Services
{
    public interface IResponseTimeService
    {
        ResponseTimeInfo GetResponseTimeInfo(string url);
    }
}
