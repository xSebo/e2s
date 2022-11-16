using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Controllers;

[ApiController]
public class Home : Controller{
    //
    // GET : /

    [Route("")]
    [AllowAnonymous]
    [HttpGet]
    public Person Index(){
        return new Person("Seb", 20);
    }
}

public class Person{
    public string Name => name;

    public int Age => age;

    public Person(string name, int age){
        this.name = name;
        this.age = age;
    }

    private String name;
    private int age;
}