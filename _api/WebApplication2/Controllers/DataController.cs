using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Controllers;

[ApiController]
[Route("data/")]
public class DataController : Controller{
    private readonly IPowerDatas _powerData;
    private readonly IInsights _insights;

    public DataController(IPowerDatas powerData, IInsights insights){
        _powerData = powerData;
        _insights = insights;
    }

    private int getCurrentUserOrgId() {
        return Int32.Parse(User.FindFirstValue("organisationId"));
    }

    [Route("byDate")]
    [HttpGet]
    public IActionResult GetData(string dataType, DateTime date1, DateTime date2){
        
        List<DataResponse> dataResponse = new List<DataResponse>();
        int test = Int32.Parse(User.FindFirstValue("organisationId"));
        int currentUserOrgId = this.getCurrentUserOrgId();
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
        List<Insight> respList = _insights.ByType(dataType, this.getCurrentUserOrgId());
        string response = respList[0].Text;
        return Ok(response);
    }
}