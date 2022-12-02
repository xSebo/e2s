using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Controllers;

[ApiController]
public class HealthCheck : Controller{
    
    // Health check to see if a container has been deployed successfully
    [Route("/health_check")]
    [HttpGet]
    public IActionResult GetStatus() {
        return StatusCode(200);
    }
}