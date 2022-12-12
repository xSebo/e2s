using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Services;

public class DataService : IDataService {
    private readonly IPowerDatas _powerData;
    private readonly IInsights _insights;
    private readonly IOrganisations _organisations;

    public DataService(IPowerDatas powerData, IInsights insights, IOrganisations organisations) {
        _powerData = powerData;
        _insights = insights;
        _organisations = organisations;
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
                if (!dataEntry.YAxis.ContainsKey(dataTypes[i])) {
                    dataEntry.AddDataType(dataTypes[i], powerdata);
                }
            }
            graphData.Add(dataEntry);
        });
        
        return graphData;
    }

    public List<InsightDTO> GetAllOrganisationInsights(int orgId) {
        List<Insight> insightList = _insights.All(orgId);
        List<InsightDTO> insightData = new List<InsightDTO>();
        insightList.ForEach(insight => insightData.Add(insight.ToDto()));
        return insightData;
    }

    public Dictionary<int, List<InsightDTO>> GetAllInsights() {
        Dictionary<int, List<InsightDTO>> returnData = new Dictionary<int, List<InsightDTO>>();
        List<Organisation> organisationList = _organisations.ToList();
        organisationList.ForEach(org => returnData.Add(org.Id, GetAllOrganisationInsights(org.Id)));
        
        return returnData;
    }
    public InsightDTO? GetTopInsight(String dataType, int orgId) {
        List<Insight> insightList = _insights.ByType(dataType, orgId);

        if (insightList == null || insightList.Count <= 0) {
            return null;
        }
        return insightList[0].ToDto();
    }

    public FlowDTO? GetTopFlow(int orgId) {
        List<PowerData> powerDataList = _powerData.All(orgId);

        if (powerDataList.Count <= 0) {
            return null;
        }
        return powerDataList[0].ToFlowDto();
        
    }
}