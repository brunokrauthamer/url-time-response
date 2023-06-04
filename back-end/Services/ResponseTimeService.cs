namespace ResponseTime.Services
{
    public class ResponseTimeService : IResponseTimeService
    {
        public ResponseTimeInfo GetResponseTimeInfo(string url)
        {
            var responseTimeInfo = new ResponseTimeInfo
            {
                ResponseTime = 1.23f,
                Url = url,
                Responded = true
            };

            return responseTimeInfo;
        }
    }
}