using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[ApiController]
[Area("/api")]

public class People : Controller
{
private readonly E2SContext _context;

    public People(E2SContext context)
    {
        _context = context;
    }

    [Route("/api/peeps")]
    [HttpGet]
    public List<User> getPeople()
    {
        return _context.Users.ToList();
    }
}