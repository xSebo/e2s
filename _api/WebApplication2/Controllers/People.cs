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
        string dateInput = "Jul 1, 2020";
        string date2 = "Jul 31, 2020";
        var parsedDate = DateTime.Parse(dateInput);
        var parsedDate2 = DateTime.Parse(date2);
        List<PowerData> powerDatas = _powerData.ByDates(parsedDate,parsedDate2);

        List<DataResponse> dataResponse = new List<DataResponse>();
        foreach (PowerData powerdata in powerDatas){
            dataResponse.Add(new DataResponse{
                XAxis = powerdata.Date.ToString(),
                YAxis = powerdata.FeelsLike
            });
        }

        return dataResponse;
    }
}