using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApplication2.Data;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Services;

namespace WebApplication2.Controllers;

[Route("authenticate/")]
[ApiController]
public class AuthController : Controller{
    private readonly E2SContext _e2sContext;
    private readonly IJwt _jwt;

    public AuthController(E2SContext e2sContext, IJwt jwt){
        _e2sContext = e2sContext;
        _jwt = jwt; 
    }
    
    
    [HttpPost]
    [Route("create")]
    public IActionResult Auth([FromBody] UserLoginDTO userLoginDto){

        User user = _e2sContext.Users.First(u => u.Email == userLoginDto.Email);
        if (user == null){
            return Unauthorized();
        }
        if (!user.Password.Equals(userLoginDto.Password)){
            return Unauthorized();
        }

        TokenResponse tokenResponse = new TokenResponse{
            JWTtoken = _jwt.GenJwt(user),
            RefreshToken = _jwt.RefreshToken(user)
        };
        var cookieOptions = new CookieOptions();
        
        cookieOptions.Expires = DateTime.Now.AddDays(1);
        cookieOptions.Path = "/";
        Response.Cookies.Append("jwTtoken", tokenResponse.JWTtoken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true});
        Response.Headers.Append("Access-Control-Allow-Credentials", "true");
               
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