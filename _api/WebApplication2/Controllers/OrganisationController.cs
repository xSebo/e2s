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

    [HttpGet]
    [Route("listOrganisations")]
    public IActionResult ListOrganisation(){
        return Ok(_orgDb.ToList());
    }

    [HttpPost]
    [Route("editOrganisation")]
    public IActionResult EditOrganisation([FromBody] OrganisationEditDTO org){
        try{
            var foundOrg = _orgDb.ById(org.Id);
            if (foundOrg == null) return Problem();
            foundOrg.Name = org.Name;
            foundOrg.FacilityName = org.FacilityName;
            _orgDb.Save();
            return Ok();
        }
        catch (Exception e){
            return Problem();
        }
    }
    
    [HttpPost]
    [Route("editUser")]
    public IActionResult EditUser([FromBody] UserEditDTO user){
        try{
            var foundUser = _users.ById(user.Id);
            Console.WriteLine(foundUser);
            Console.WriteLine(user);
            if (foundUser == null) return Problem();
            foundUser.Email = user.Email;
            foundUser.Name = user.Name;
            foundUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _users.Save();
            return Ok();
        }
        catch (Exception e){
            return Problem();
        }
    }

    [HttpGet]
    [Route("listUsers")] //listUser?orgId=<orgId>
    public IActionResult ListUsers(int orgId){
        List<UserTransferDTO> users = new List<UserTransferDTO>();
        _users.ByOrgId(orgId).ForEach(user => users.Add(new UserTransferDTO(user)));
        return Ok(users);
    }
        
    [HttpPost]
    [Route("createOrganisation")]
    public IActionResult CreateOrganisation([FromForm] OrganisationCreationDTO org){
        FileUpload upload = _images.Upload(org.File);
        if (upload.IsSuccess){
            Organisation organisation = new Organisation{
                Name = org.Name,
                Logo = upload.Name!,
                FacilityName = org.FacilityName
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