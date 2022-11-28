
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApplication2.Controllers;
using WebApplication2.DTOs;
using Microsoft.Extensions.Hosting;
using WebApplication2.Repos;
using WebApplication2.Services;
using Assert = Xunit.Assert;




namespace Tests.Controllers;

[TestClass]
public class OrganisationControllerTest{
    private readonly OrganisationController _orgController;
    private readonly IUsers _users;

    public OrganisationControllerTest(){
        var dir = AppDomain.CurrentDomain.BaseDirectory;
        for (int i = 0; i < 4; i++){
            dir = Directory.GetParent(dir)!.ToString();
        }
        var serviceProvider = Startup.GetServices();
        IHostEnvironment testHostEnv = new TestHostEnvironment{
            ApplicationName = null,
            ContentRootFileProvider = null,
            ContentRootPath = dir,
            EnvironmentName = null
        };
        IImages images = new Images(testHostEnv);
        _users = serviceProvider.GetService<IUsers>()!;
        _orgController = new OrganisationController(images,
            serviceProvider.GetService<IOrganisations>()!,
            _users,
            serviceProvider.GetService<IAuthorities>()!);
    }

    [DataTestMethod]
    [DataRow("Org Name", "file.png")]
    [DataRow("Org Name", "file.jpg")]
    public void ValidFiles(string orgName, string fileName){
        //Setup mock file using a memory stream
        var content = "Hello World from a Fake File";
        var stream = new MemoryStream();
        var writer = new StreamWriter(stream);
        writer.Write(content);
        writer.Flush();
        stream.Position = 0;

        //create FormFile with desired data
        IFormFile file = new FormFile(stream, 0, stream.Length, "id_from_form", fileName);

        OrganisationCreationDTO orgDto = new OrganisationCreationDTO{
            Name = orgName,
            File = file
        };

        var request = _orgController.CreateOrganisation(orgDto);
        int response = (int)((IStatusCodeActionResult)request).StatusCode!;
        
        Assert.Equal((int)HttpStatusCode.OK, response);
    }
    
    [DataTestMethod]
    [DataRow("Org Name", "file.pdf")]
    [DataRow("Org Name", "file.docx")]
    public void InvalidFiles(string orgName, string fileName){
        //Setup mock file using a memory stream
        var content = "Hello World from a Fake File";
        var stream = new MemoryStream();
        var writer = new StreamWriter(stream);
        writer.Write(content);
        writer.Flush();
        stream.Position = 0;

        //create FormFile with desired data
        IFormFile file = new FormFile(stream, 0, stream.Length, "id_from_form", fileName);

        OrganisationCreationDTO orgDto = new OrganisationCreationDTO{
            Name = orgName,
            File = file
        };

        var request = _orgController.CreateOrganisation(orgDto);
        int response = (int)((IStatusCodeActionResult)request).StatusCode!;

        Assert.Equal((int)HttpStatusCode.InternalServerError, response);
    }

    
    
    [DataTestMethod]
    [DataRow("charlie", "charlie@email.com", "example", "1", "1")]
    // [AllowAnonymous]
    public void TestValidDetails(string name, string email, string password, string authorityId, string organisationId){
        // arrange
        
        // act
        var actual = _orgController.CreateUser(new UserCreationDTO{
            Name = name,
            Email = email,
            Password = password,
            AuthorityId = authorityId,
            OrganisationId = organisationId
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.OK,response);
        var checkUser = _users.ByEmail("charlie@email.com");
        Assert.NotNull(checkUser);
    }
    
    [DataTestMethod]
    [DataRow("charlie", "user@email.com", "example", "1", "1")]
    // [AllowAnonymous]
    public void TestDuplicateEmail(string name, string email, string password, string authorityId, string organisationId){
        // arrange
        
        // act
        var actual = _orgController.CreateUser(new UserCreationDTO{
            Name = name,
            Email = email,
            Password = password,
            AuthorityId = authorityId,
            OrganisationId = organisationId
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.InternalServerError,response);
    }
}