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

    [Route("byDate")] //byDate?dataType=<datatype>&date1=<date>&date2=<date>
    [HttpGet]
    public IActionResult GetData(string dataType, DateTime date1, DateTime date2){
        List<PowerData> powerDatas = _powerData.ByDates(date1,date2);

        List<DataResponse> dataResponse = new List<DataResponse>();
        foreach (PowerData powerdata in powerDatas){
            try{
                dataResponse.Add(new DataResponse{
                    XAxis = powerdata.Date.ToString(),
                    YAxis = powerdata.dict[dataType]
                });
            }
            catch (Exception e){
                return Problem();
            }
        }
        return Ok(dataResponse);
    }
}