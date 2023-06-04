using Microsoft.AspNetCore.Mvc;
using ResponseTime.Services;

namespace ResponseTime.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResponseTimeController : ControllerBase
    {
        private readonly IResponseTimeService _reponseTimeService;

        public ResponseTimeController(IResponseTimeService responseTimeService)
        {
            _reponseTimeService = responseTimeService;
        }

        [HttpGet("{url}")]
        public IActionResult Get(string url)
        {
            var responseTimeInfo = _reponseTimeService.GetResponseTimeInfo(url);
            return Ok(responseTimeInfo);
        }
    }
}
