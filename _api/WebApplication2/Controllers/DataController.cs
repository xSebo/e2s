using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;

namespace WebApplication2.Controllers;

[ApiController]
[Authorize(Roles="User")]
[Route("data/")]
public class DataController : Controller{
    private readonly IPowerDatas _powerData;
    private DataService _dataService;

    public DataController(IPowerDatas powerData, DataService dataService){
        _powerData = powerData;
        _dataService = dataService;
    }

    private int GetCurrentUserOrgId() {
        return Int32.Parse(User.FindFirstValue("organisationId"));
    }

    [Route("byDate")]
    [HttpGet]
    public IActionResult GetData(string dataType, DateTime date1, DateTime date2){
        int currentUserOrgId = this.GetCurrentUserOrgId();
        List<DataResponse> data = _dataService.GetDataByDates();
        

        return Ok(dataResponse);
    }

    [HttpGet]
    [Route("insight")]
    public IActionResult GetInsight(string dataType) {
        InsightDTO? topInsight = _dataService.GetTopInsight(dataType, GetCurrentUserOrgId());
        if (topInsight == null) {
            return NotFound();
        }
        return Ok(topInsight);
    }
}