using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;

namespace WebApplication2.Controllers;

[ApiController]
[Authorize(Roles="Admin")]
[Route("organisations/")]
public class OrganisationController : Controller{
    private readonly IImages _images;
    private readonly IOrganisations _orgDb;
    private readonly IUsers _users;
    private readonly IAuthorities _authorities;
    

    public OrganisationController(IImages images, IOrganisations orgDb, IUsers users, IAuthorities authorities){
        _images = images;
        _orgDb = orgDb;
        _users = users;
        _authorities = authorities;
    }

    [HttpPost]
    [Route("createOrganisation")]
    public IActionResult CreateOrganisation([FromForm] OrganisationCreationDTO org){
        FileUpload upload = _images.Upload(org.File);
        if (upload.IsSuccess){
            Organisation organisation = new Organisation{
                Name = org.Name,
                Logo = upload.Name!,
                FacilityName = ""
            };
            _orgDb.Add(organisation);
            _orgDb.Save();
            return Ok();
        }

        return Problem();

    }
    
    [HttpPost]
    [Route("createUser")]
    public IActionResult CreateUser([FromBody] UserCreationDTO userForm)
    {
        //if this email has not already been taken
        if (_users.ByEmail(userForm.Email) == null)
        {
            Organisation org = _orgDb.ById(int.Parse(userForm.OrganisationId));
            Authority? auth = _authorities.ByName("user");
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userForm.Password);
            User user = new User
            {
                Name = userForm.Name,
                Password = passwordHash,
                Email = userForm.Email,
                Authority = auth,
                Organisation = org
            };
            _users.Add(user);
            _users.Save();
            return Ok();
        }
        return Problem();
    }
}