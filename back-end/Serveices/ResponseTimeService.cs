// using System;
// using System.Diagnostics;
// using System.Net;

// namespace ResponseTime.Services
// {
//     public class ResponseTimeService : IResponseTimeService
//     {
//         public ResponseTimeInfo GetResponseTimeInfo(string url)
//         {
            
//             var responseTimeInfo = new ResponseTimeInfo
//             {
//                 ResponseTime = "1.23 ms",
//                 Url = url,
//                 Responded = true
//             };

//             return responseTimeInfo;
//         }
//     }
// }


using System;
using System.Diagnostics;
using System.Net;

namespace ResponseTime.Services
{
    public class ResponseTimeService : IResponseTimeService
    {
        public ResponseTimeInfo GetResponseTimeInfo(string url)
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

                    var responseTimeInfo = new ResponseTimeInfo
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

                var responseTimeInfo = new ResponseTimeInfo
                {
                    ResponseTime = responseTime.TotalMilliseconds + "ms",
                    Url = url,
                    Responded = false
                };
                return responseTimeInfo;
                
            }

            // var responseTimeInfo = new ResponseTimeInfo
            // {
            //     ResponseTime = "1.23 ms",
            //     Url = url,
            //     Responded = true
            // };

            // return responseTimeInfo;
        }
    }
}