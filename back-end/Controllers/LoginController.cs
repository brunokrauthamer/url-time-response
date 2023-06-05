using Microsoft.AspNetCore.Mvc;
using ResponseTime.Models;
using ResponseTime.Repositories;
using ResponseTime.Services;

namespace ResponseTime.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] UserCredentials credentials)
        {
            // Recupera o usuário
            var user = UserRepository.Get(credentials.Username, credentials.Password);

            // Verifica se o usuário existe com a respectiva senha
            if (user == null)
                return NotFound(new { message = "Usuário ou senha Inválidos" });
            
            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Oculta a senha
            user.Password = "";

            // Retorna os dados
            return Ok(new { user = user, token = token } );
        }
    }
}