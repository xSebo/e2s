using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Controllers;

[ApiController]
public class People : Controller{
    private readonly IPowerDatas _powerData;

    public People(IPowerDatas powerData){
        _powerData = powerData;
    }

    [Route("")]
    [HttpGet]
    public List<PowerData> getPeople(){
        string dateInput = "Jan 1, 2020";
        var parsedDate = DateTime.Parse(dateInput);
        return _powerData.ByDate(parsedDate);
    }
}