using Microsoft.AspNetCore.Mvc;
using ResponseTime.Models;
using ResponseTime.Repositories;
using ResponseTime.Services;

namespace ResponseTime.Controllers
{
    /// <summary>
    /// Controlador responsável por manipular as requisições relacionadas ao login.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// Realiza o processo de autenticação e geração de token para um usuário.
        /// </summary>
        /// <param name="credentials">Credenciais de usuário (nome de usuário e senha).</param>
        /// <returns>Resposta HTTP contendo os dados do usuário autenticado e o token gerado.</returns>
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