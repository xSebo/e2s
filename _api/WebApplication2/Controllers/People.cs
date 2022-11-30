using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.DTOs;
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
    public List<DataResponse> GetPeople(){
        return new List<DataResponse>();
    }
}