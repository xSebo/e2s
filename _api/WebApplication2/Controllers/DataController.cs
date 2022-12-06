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

    public DataController(IPowerDatas powerData){
        _powerData = powerData;
    }

    // [Route("byDate")] //byDate?dataType=<datatype>&date1=<date>&date2=<date>
    // [HttpGet]
    // public IActionResult GetData(string dataType, DateTime date1, DateTime date2){
    //     List<PowerData> powerDatas = _powerData.ByDates(date1,date2);
    //
    //     List<DataResponse> dataResponse = new List<DataResponse>();
    //     foreach (PowerData powerdata in powerDatas){
    //         try{
    //             string date = powerdata.Date.ToString("dd/M/yyy HH:mm:ss");
    //             dataResponse.Add(new DataResponse{
    //                 XAxis = date,
    //                 YAxis = new PowerDataMap(powerdata).dict[dataType]
    //             });
    //         }
    //         catch (Exception e){
    //             return Problem(e.Message);
    //         }
    //     }
    //     return Ok(dataResponse);
    // }
    
    [Route("byDateTest")] //byDate?dataType=<datatype>&date1=<date>&date2=<date>
    [HttpGet]
    public IActionResult GetData(string dataType, DateTime date1, DateTime date2){
        
        List<DataResponse> dataResponse = new List<DataResponse>();

        try {
            int currentUserOrgId = Int32.Parse(User.FindFirstValue("organisationId"));

            List<PowerData> powerDatas = _powerData.ByDatesAndOrganisationId(date1,date2, currentUserOrgId);
            
            foreach (PowerData powerdata in powerDatas){
                try{
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
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }

        return Ok(dataResponse);
    }
}