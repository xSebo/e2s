using System.Text;
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

    [Route("byDate")] //byDate?dataTypes=<datatype>&date1=<date>&date2=<date>
    [HttpGet]
    public IActionResult GetData(string dataTypes, DateTime date1, DateTime date2){
        List<GraphDataDTO>? graphData = _dataService.GetDataByDates(dataTypes.Split(","), date1, date2, GetCurrentUserOrgId());

        return Ok(graphData);
    }
    
    [Route("flow")] //flow
    [HttpGet]
    public IActionResult GetFlow(){
        FlowDTO? flowData = _dataService.GetTopFlow(GetCurrentUserOrgId());
        return Ok(flowData);
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