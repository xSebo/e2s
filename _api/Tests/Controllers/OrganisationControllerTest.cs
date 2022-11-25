using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApplication2.Controllers;
using WebApplication2.Data;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;
using Assert = Xunit.Assert;

namespace Tests.Controllers;

[TestClass]
public class OrganisationControllerTest : IClassFixture<AuthController>{
    private readonly IJwt _jwt;

    private readonly IImages _images;
    private readonly IOrganisations _orgDb;
    private readonly IUsers _users;
    private readonly IAuthorities _authorities;
    

    public OrganisationControllerTest(){
        var serviceProvider = Startup.GetServices();

        // _jwt = serviceProvider.GetService<IJwt>()!;
        _images = serviceProvider.GetService <IImages>()!;
        _orgDb = serviceProvider.GetService <IOrganisations>()!;
        _users = serviceProvider.GetService<IUsers>()!;
        _authorities = serviceProvider.GetService <IAuthorities>()!;
    }

    
    [DataTestMethod]
    [DataRow("charlie", "charlie@email.com", "example", "1", "1")]
    // [AllowAnonymous]
    public void CorrectDetails(string name, string email, string password, string authorityId, string organisationId){
        // arrange
        OrganisationController organisationController = new OrganisationController(_images, _orgDb, _users, _authorities);
        // act
        var actual = organisationController.CreateUser(new UserCreationDTO{
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
}