using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Controllers;

[ApiController]

public class People : Controller{
    private readonly IUsers _users;

    public People(IUsers users){
        _users = users;
    }

    [Route("")]
    [HttpGet]
    public List<User> getPeople(){
        return _users.ByOrgId(2);
    }
}