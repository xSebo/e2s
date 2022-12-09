using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IInsights {
    
    public List<Insight> ByType(string type, int orgId);
}