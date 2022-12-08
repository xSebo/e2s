using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Services;

public class DataService {
    private readonly IPowerDatas _powerData;
    private readonly IInsights _insights;
    public DataService(IPowerDatas powerData, IInsights insights){
        _powerData = powerData;
        _insights = insights;
    }

    public List<DataResponse> GetDataByDates(string dataType, DateTime date1, DateTime date2, int orgId) {
        List<PowerData> powerDatas = _powerData.ByDates(date1, date2, orgId);
        
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
    }
    
    public InsightDTO? GetTopInsight(String dataType, int orgId) {
        List<Insight> insightList = _insights.ByType(dataType, orgId);

        if (insightList.Count <= 0) {
            return null;
        }
        return insightList[0].ToDto();
    }
}