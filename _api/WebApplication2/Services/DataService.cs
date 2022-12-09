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

    public List<GraphDataDTO>? GetDataByDates(string[] dataTypes, DateTime date1, DateTime date2, int orgId) {

        List<PowerData> powerDatas = _powerData.ByDates(date1, date2, orgId);
        
        if (powerDatas.Count <= 0) {
            // TODO Throw NOT_FOUND Exception
            return null;
        }
        if (dataTypes.Any(type => powerDatas[0].GetDataByDataType(type) == null) || dataTypes.Length <= 0) {
            // TODO Throw BAD_REQUEST EXCEPTION
            return null; // This return would only return out the loop
        }

        List<GraphDataDTO> graphData = new List<GraphDataDTO>();
        powerDatas.ForEach(powerdata => {
            GraphDataDTO dataEntry = new GraphDataDTO(dataTypes[0], powerdata);
            for (int i=1; i < (dataTypes.Length); i++) {
                dataEntry.AddDataType(dataTypes[i], powerdata);
            }
            graphData.Add(dataEntry);
        });
        
        return graphData;
    }
    
    public InsightDTO? GetTopInsight(String dataType, int orgId) {
        List<Insight> insightList = _insights.ByType(dataType, orgId);

        if (insightList.Count <= 0) {
            return null;
        }
        return insightList[0].ToDto();
    }
}