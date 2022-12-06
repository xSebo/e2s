using System.Text;
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

    [Route("byDate")] //byDate?dataTypes=<datatype>&date1=<date>&date2=<date>
    [HttpGet]
    public IActionResult GetData(string dataTypes, DateTime date1, DateTime date2){
        var realDataTypes = dataTypes.Split(",");
        var powerDatas = _powerData.ByDates(date1, date2);
        
        List<DataResponse> multiDataResponse = new List<DataResponse>();
        foreach (PowerData powerdata in powerDatas){
            try{
                string date = powerdata.Date.ToString("dd/M/yyy HH:mm");
                
                var powerMap = new PowerDataMap(powerdata);
                Dictionary<string, float> dataDict = new Dictionary<string, float>();
                foreach (string dataType in realDataTypes){
                    dataDict[dataType] = powerMap.dict[dataType];
                }
                
                multiDataResponse.Add(new DataResponse(){
                    XAxis = date,
                    YAxis = dataDict
                });
            }
            catch (Exception e){
                return Problem(e.Message);
            }
        }
        return Ok(multiDataResponse);
    }
}