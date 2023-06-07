using System;
using System.Diagnostics;
using System.Net;
using ResponseTime.Models;

namespace ResponseTime.Services
{
    public class ResponseTimeService : IResponseTimeService
    {
        /// <summary>
        /// Determina se uma url está disponível e o tempo de resposta em ms.
        /// </summary>
        /// <param name="url">string url a ser testada</param>
        /// <returns>Objeto contendo a própria url, um booleano dizendo se houve ou não resposta e o tempo de resposta.</returns>
        public ResponseTimeModel GetResponseTimeInfo(string url)
        {
            // System Disgnostics namespace
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
                        ResponseTime = responseTime.TotalMilliseconds + " ms",
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
                    ResponseTime = responseTime.TotalMilliseconds + " ms",
                    Url = url,
                    Responded = false
                };
                return responseTimeInfo;
                
            }

        }
    }
}