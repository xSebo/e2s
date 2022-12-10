using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Services;

public interface IDataService {

    public List<GraphDataDTO>? GetDataByDates(string[] dataTypes, DateTime date1, DateTime date2, int orgId);
    public List<InsightDTO> GetAllOrganisationInsights(int orgId);
    public Dictionary<int, List<InsightDTO>> GetAllInsights();
    public InsightDTO? GetTopInsight(String dataType, int orgId);
    public FlowDTO? GetTopFlow(int orgId);
}