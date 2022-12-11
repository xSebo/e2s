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
        
        
        try
        {
            Console.WriteLine(Request.Cookies.TryGetValue("jwTtoken", out string strval));
            Console.WriteLine("hiiiiiiiiiiiiiiii");

            if (strval == "sam")
            {
                
            }
            
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        
        User? user;
        try{
            user = _users.ByEmail(userLoginDto.Email);
        }
        catch (Exception e){
            Console.WriteLine(e.Message);
            return Unauthorized();
        }

        if (user == null ){
            return Unauthorized();
        }
        bool verified = BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.Password);
        if (!verified){
            return Unauthorized();
        }

        TokenResponse tokenResponse = new TokenResponse{
            JWTtoken = _jwt.GenJwt(user),
            RefreshToken = _jwt.RefreshToken(user),
            Roles = user.Authority.Id.ToString()
        };
        var cookieOptions = new CookieOptions();
        
        cookieOptions.Expires = DateTime.Now.AddDays(1);
        cookieOptions.Path = "/";
        try{
            Response.Cookies.Append("jwTtoken", tokenResponse.JWTtoken,
                new CookieOptions(){ SameSite = SameSiteMode.None, Secure = true });
            Response.Headers.Append("Access-Control-Allow-Credentials", "true");
        }
        catch (NullReferenceException e){
            Console.WriteLine(e);
            //This error is thrown when this method is run by a test, as it does not have any response headers.
            //If it is thrown when running the program normally, something has gone wrong.
        }

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