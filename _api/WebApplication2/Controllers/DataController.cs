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
        
        List<DataResponse> dataResponse = new List<DataResponse>();
        int test = Int32.Parse(User.FindFirstValue("organisationId"));
        int currentUserOrgId = this.GetCurrentUserOrgId();
        List<PowerData> powerDatas = _powerData.ByDates(date1,date2, currentUserOrgId);
        
        foreach (PowerData powerdata in powerDatas){
            try {
                string date = powerdata.Date.ToString("dd/M/yyy HH:mm:ss");
                dataResponse.Add(new DataResponse{
                    XAxis = date,
                    YAxis = new PowerDataMap(powerdata).dict[dataType]
                });
            }
            catch (Exception e){
                return Problem(e.Message);
            }
        }

        return Ok(dataResponse);
    }

    [HttpGet]
    [Route("insight")]
    public IActionResult GetInsight(string dataType) {
        InsightDTO? topInsight = _dataService.getTopInsight(dataType, GetCurrentUserOrgId());
        if (topInsight == null) {
            return NotFound();
        }
        return Ok(topInsight);
    }
}