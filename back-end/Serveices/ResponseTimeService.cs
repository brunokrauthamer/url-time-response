using System;
using System.Diagnostics;
using System.Net;
using ResponseTime.Models;

namespace ResponseTime.Services
{
    public class ResponseTimeService : IResponseTimeService
    {
        public ResponseTimeModel GetResponseTimeInfo(string url)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {

                    stopwatch.Stop();
                    TimeSpan responseTime = stopwatch.Elapsed;

                    var responseTimeInfo = new ResponseTimeModel
                    {
                        ResponseTime = responseTime.TotalMilliseconds + "ms",
                        Url = url,
                        Responded = true
                    };

                    return responseTimeInfo;
                }
            }
            catch (WebException ex)
            {
                stopwatch.Stop();
                TimeSpan responseTime = stopwatch.Elapsed;

                var responseTimeInfo = new ResponseTimeModel
                {
                    ResponseTime = responseTime.TotalMilliseconds + "ms",
                    Url = url,
                    Responded = false
                };
                return responseTimeInfo;
                
            }

        }
    }
}