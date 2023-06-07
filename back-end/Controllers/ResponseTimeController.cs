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

        /// <summary>
        /// Inicializa uma nova instância da classe ResponseTimeController.
        /// </summary>
        /// <param name="responseTimeService">Serviço de tempo de resposta a ser injetado.</param>
        public ResponseTimeController(IResponseTimeService responseTimeService)
        {
            _reponseTimeService = responseTimeService;
        }

        /// <summary>
        /// Obtém o tempo de resposta para uma URL específica.
        /// </summary>
        /// <param name="url">URL para a qual o tempo de resposta deve ser obtido.</param>
        /// <returns>Resposta HTTP contendo as informações de tempo de resposta.</returns>
        [HttpGet]
        [Authorize]
        public IActionResult Get([FromQuery(Name = "url")] string url)
        {
            var responseTimeInfo = _reponseTimeService.GetResponseTimeInfo(url);
            return Ok(responseTimeInfo);
        }
    }
}
