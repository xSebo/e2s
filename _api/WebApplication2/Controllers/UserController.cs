using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
public class UserController : Controller{

    private readonly E2SContext _context;

    public UserController(E2SContext context){
        _context = context;
    }
    
    [Route("")]
    [HttpGet]
    public List<UserToken> Hello(){
        return _context.UserTokens.ToList();
    }
}