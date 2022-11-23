using System.Net;
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
public class AuthControllerTest : IClassFixture<AuthController>{
    private readonly IJwt _jwt;
    private readonly IUsers _users;

    public AuthControllerTest(){
        var serviceProvider = Startup.GetServices();

        _jwt = serviceProvider.GetService<IJwt>()!;
        _users = serviceProvider.GetService<IUsers>()!;
    }

    [DataTestMethod]
    [DataRow("wrongemail", "wrongpassword")]
    [DataRow("seb@email.com","wrongpassword")]
    public void WrongDetails(string email, string password){
        // arrange
        AuthController authController = new AuthController(_users, _jwt);
        // act
        var actual = authController.Auth(new UserLoginDTO{
            Password = password,
            Email = email
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.Unauthorized,response);
    }
    
    [DataTestMethod]
    [DataRow("seb@email.com", "example")]
    public void CorrectDetails(string email, string password){
        // arrange
        AuthController authController = new AuthController(_users, _jwt);
        // act
        var actual = authController.Auth(new UserLoginDTO{
            Password = password,
            Email = email
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.OK,response);
    }
}