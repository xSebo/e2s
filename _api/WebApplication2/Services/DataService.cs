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

    public List<GraphDataDTO>? GetDataByDates(string dataType, DateTime date1, DateTime date2, int orgId) {
        List<PowerData> powerDatas = _powerData.ByDates(date1, date2, orgId);
        
        if (powerDatas.Count <= 0) {
            // TODO Throw NOT_FOUND Exception
            return null;
        } 
        if (powerDatas[0].GetDataByDataType(dataType) == null) {
            // TODO Throw BAD_REQUEST Exception
            return null;
        }

        List<GraphDataDTO> graphData = new List<GraphDataDTO>();
        powerDatas.ForEach(powerdata => {
            graphData.Add(new GraphDataDTO(dataType, powerdata));
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