using Microsoft.AspNetCore.Mvc;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;

namespace WebApplication2.Controllers;

[Route("authenticate/")]
[ApiController]
public class AuthController : Controller{
    private readonly IUsers _users;
    private readonly IJwt _jwt;

    public AuthController(IUsers users, IJwt jwt){
        _users = users;
        _jwt = jwt; 
    }

    [HttpPost]
    [Route("create")]
    public IActionResult Auth([FromBody] UserLoginDTO userLoginDto){
        User? user;
        try{
            user = _users.ByEmail(userLoginDto.Email);
        }
        catch (Exception e){
            Console.WriteLine(e.Message);
            return Unauthorized();
        }

        if (user == null){
            return Unauthorized();
        }
        if (!user.Password!.Equals(userLoginDto.Password)){
            return Unauthorized();
        }

        TokenResponse tokenResponse = new TokenResponse{
            JWTtoken = _jwt.GenJwt(user),
            RefreshToken = _jwt.RefreshToken(user)
        };
        
        return Ok(tokenResponse);
    }

    [HttpPost]
    [Route("refresh")]
    public IActionResult Refresh([FromBody] TokenResponse token){

        var refreshResponse = _jwt.RefreshJwt(token);
        if (refreshResponse.Unauthorised){
            return Unauthorized();
        }

        return Ok(refreshResponse.Response);
    }
    
}