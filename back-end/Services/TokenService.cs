using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ResponseTime.Models;

namespace ResponseTime.Services
{
    public static class TokenService
    {
        /// <summary>
        /// Gerador de token usando JWT.
        /// </summary>
        /// <param name="User user">Credenciais do usuário no formato User</param>
        /// <returns>string token</returns>
        public static string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secret_keyXzXYzRG5DqnTLmzGfWZvjmJtMfg85x+oQ6XdQOhJ3Pw="); // Chave secreta para a assinatura do token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                }),
                Expires = DateTime.UtcNow.AddDays(1), // Define a validade do token
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}