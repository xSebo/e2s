using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[ApiController]
public class CustomerController : Controller{

    private readonly E2SContext _context;

    public CustomerController(E2SContext context){
        _context = context;
    }
    
    [Route("/test")]
    [AllowAnonymous]
    [HttpGet]
    public User Hello(){
        
        int authId = _context.Authorities.SingleOrDefault(authority => authority.Name == "Admin")!.Id ?? 1;
        int userId = _context.UserAuthorityLinks.SingleOrDefault(link => link.AuthorityId == authId)!.UserId ?? 1;
        User user = _context.Users.Find(userId)!;
        

        return user;
    }
}