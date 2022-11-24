using System.Net;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApplication2.Controllers;
using WebApplication2.DTOs;
using WebApplication2.Repos;
using WebApplication2.Services;
using Assert = Xunit.Assert;

namespace Tests.Controllers;

[TestClass]
public class OrganisationControllerTest{
    private readonly OrganisationController _orgController;

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
        _orgController = new OrganisationController(images,
            serviceProvider.GetService<IOrganisations>()!);
    }
    
    [DataTestMethod]
    [DataRow("Org Name", "file.png")]
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
}