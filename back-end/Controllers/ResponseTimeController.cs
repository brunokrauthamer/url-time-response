using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        [Authorize]
        public IActionResult Get([FromQuery(Name = "url")] string url)
        {
            var responseTimeInfo = _reponseTimeService.GetResponseTimeInfo(url);
            return Ok(responseTimeInfo);
        }
    }
}
