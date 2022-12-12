using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;
using Assert = Xunit.Assert;

namespace Tests;

[TestClass]
public class ExampleTest {

    // Used for mocking the Users repository
    private readonly Mock<IUsers> MockUser = new Mock<IUsers>();
    
    // How to assert a value
    [Fact]
    public void UsingAssertTest() {
        Assert.True(true);
    }

    // How to mock the Entity Framework classes / Database 
    // This test will check that the user service returns the correct DTO information
    // All tests should have names that reflect what they test e.g. userService_GetUserToEmail_validEmail()
    [Fact]
    public void MockingEntityFrameworkTest() {
        // The email that we are searching for
        const string testEmail = "johnsmith@smithco.com";
        
        // Test Set Up
        var userEmailDtoMock = new User() {
            Id = 1,
            Name = "John Smith",
            Password = "Secret",
            Email = testEmail,
            Authority = new Authority() { Id = 1, Name = "User" },
            Organisation = new Organisation() { Id = 1, Name = "Smith&Co", Logo = "img.png", FacilityName = "Workshop" }
        };
        this.MockUser.Setup(p => p.ByEmail(testEmail)).Returns(userEmailDtoMock);
        
        // Act
        var userService = new UserService(MockUser.Object);     // The Object we pass is the one that we have mocked for the service
        UserEmailDTO? returnedDto = userService.GetUserToEmail(testEmail);
        
        // Assert
        Assert.True(returnedDto.Email == testEmail);
    }
}