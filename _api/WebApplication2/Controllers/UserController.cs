using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[ApiController]
public class UserController : Controller{

    private readonly E2SContext _context;

    public UserController(E2SContext context){
        _context = context;
    }
    
    [Route("")]
    [AllowAnonymous]
    [HttpGet]
    public User Hello(){
        return _context.Users.SingleOrDefault(x=>x.Name == "Sam")!;
    }
}