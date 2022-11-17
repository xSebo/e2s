using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApplication2.Data;
using WebApplication2.DTOs;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[Route("authenticate/")]
[ApiController]
public class AuthController : Controller{
    private readonly E2SContext _e2sContext;
    private readonly JWTKey _jwt;
    
    public AuthController(E2SContext e2sContext, IOptions<JWTKey> security){
        _e2sContext = e2sContext;
        _jwt = security.Value; 
    }
    
    
    [HttpPost]
    [Route("test")]
    [Consumes("application/json")]
    public IActionResult Authenticate([FromBody] UserLoginDTO userLoginDto){
        Console.WriteLine(_jwt.Key);
        
        User user = _e2sContext.Users.First(u => u.Email == userLoginDto.Email);
        if (user == null){
            return Unauthorized();
        }
        if (!user.Password.Equals(userLoginDto.Password)){
            return Unauthorized();
        }

        var tokenhandler = new JwtSecurityTokenHandler();
        var tokenkey = Encoding.UTF8.GetBytes(_jwt.Key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Authority.Name!)

                }
            ),
            Expires = DateTime.Now.AddMinutes(180),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
        };
        var token = tokenhandler.CreateToken(tokenDescriptor);
        string finalToken = tokenhandler.WriteToken(token);

        return Ok(finalToken);
    }    
}