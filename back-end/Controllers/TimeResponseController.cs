using Microsoft.AspNetCore.Mvc;
using TimeResponse.Services;

namespace TimeResponse.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimeResponseController : ControllerBase
    {
        private readonly ITimeResponseSerive _timeResponseSerice;

        public TimeResponseController(ITimeResponseSerive timeResponseService)
        {
            _timeResponseSerice = timeResponseService;
        }

        [HttpGet("{url}")]
        public IActionResult Get(string url)
        {
            var reponseTimeInfo = _timeResponseSerice.ResponseTimeInfo(url);
            return Ok(ResponseTimeInfo);
        }
    }
}
