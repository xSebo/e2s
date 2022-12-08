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

    public InsightDTO? getTopInsight(String dataType, int orgId) {
        List<Insight> insightList = _insights.ByType(dataType, orgId);

        if (insightList.Count <= 0) {
            return null;
        }
        return insightList[0].ToDto();
    }
}