using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers;

[ApiController]
public class CustomerController : Controller{

    private readonly ShopContext _context;

    public CustomerController(ShopContext context){
        _context = context;
    }
    
    [Route("/test")]
    [AllowAnonymous]
    [HttpGet]
    public List<Customer> Hello(){
        Customer customer = new Customer{
            FirstName = "Bob",
            LastName = "Bob" + new Random().Next(0,100),
            Phone = (new Random().Next(100,999)).ToString(),
            Address = "House"
        };
        _context.Customers.Add(customer);
        _context.SaveChanges();

        return _context.Customers.ToList();
    }
}