using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Insights : IInsights {
    private readonly DbSet<Insight> _insights;

    public Insights(E2SContext e2SContext){
        _insights = e2SContext.Insights;
    }

    public List<Insight> ByType(string type, int orgId)
    {
        return _insights.Where(i => i.Type.Equals(type) && i.Organisation.Id == orgId).ToList();
    }
}