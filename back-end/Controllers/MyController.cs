using Microsoft.AspNetCore.Mvc;
using MyProject.Services;

namespace MyProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyController : ControllerBase
    {
        private readonly IMyService _myService;

        public MyController(IMyService myService)
        {
            _myService = myService;
        }
        [HttpGet("{message}")]
        public IActionResult Get(string message)
        {
            string concatenetedMessage = _myService.ConcatenateMessage(message);
            var responseObject = new { message = concatenetedMessage };
            return Ok(responseObject);
        }
    }
}
