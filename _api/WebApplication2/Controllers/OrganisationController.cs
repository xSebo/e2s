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

    public OrganisationController(IImages images, IOrganisations orgDb){
        _images = images;
        _orgDb = orgDb;
    }

    [HttpPost]
    [Route("createOrganisation")]
    public IActionResult CreateOrganisation([FromForm] OrganisationCreationDTO org){
        FileUpload upload = _images.Upload(org.File);
        if (upload.IsSuccess){
            Organisation organisation = new Organisation{
                Name = org.Name,
                Logo = upload.Name!
            };
            _orgDb.Add(organisation);
            _orgDb.Save();
            return Ok();
        }

        return Problem();

    }
    
}