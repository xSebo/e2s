using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.DTOs;
using WebApplication2.Services;

namespace WebApplication2.Controllers;

[ApiController]
[Authorize(Roles="Admin")]
[Route("organisations/")]
public class OrganisationController : Controller{
    private readonly IImages _images;

    public OrganisationController(IImages images){
        _images = images;
    }

    [HttpPost]
    [Route("img")]
    public IActionResult UploadImage(){
        try{
            var files = Request.Form.Files;
            FileUpload upload = _images.Upload(files);
            return Ok(upload);
        }
        catch (Exception e){
            return Problem(e.Message);
        }
    }
    
}