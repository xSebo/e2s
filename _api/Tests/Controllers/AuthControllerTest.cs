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
    private readonly AuthController _authController;

    public AuthControllerTest(){
        var serviceProvider = Startup.GetServices();
        _authController = new AuthController(serviceProvider.GetService<IUsers>()!, serviceProvider.GetService<IJwt>()!);
    }

    [DataTestMethod]
    [DataRow("wrongemail", "wrongpassword")]
    [DataRow("test@email.com","wrongpassword")]
    public void WrongDetails(string email, string password){
        // act
        var actual = _authController.Auth(new UserLoginDTO{
            Password = password,
            Email = email
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.Unauthorized,response);
    }
    
    [DataTestMethod]
    [DataRow("test@email.com", "example")]
    public void CorrectDetails(string email, string password){
        // act
        var actual = _authController.Auth(new UserLoginDTO{
            Password = password,
            Email = email
        });
        int response = (int)((IStatusCodeActionResult)actual).StatusCode!;
        // assert
        Assert.Equal((int)HttpStatusCode.OK,response);
    }
}