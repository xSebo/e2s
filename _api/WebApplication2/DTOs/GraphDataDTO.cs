using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class GraphDataDTO{
    
    public string XAxis{ get; set; }
    public Dictionary<string,float> YAxis{ get; set; }

    public GraphDataDTO(string dataType, PowerData powerDataModel) {
        XAxis = powerDataModel.Date.ToString("dd/M/yyy HH:mm:ss");
        YAxis = new Dictionary<string, float>();
        AddDataType(dataType, powerDataModel);
    }

    public void AddDataType(string dataType, PowerData powerDataModel) {
        YAxis.Add(dataType, powerDataModel.GetDataByDataType(dataType).Value);
    }
}