using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IPowerDatas{
    
    public List<PowerData> ByDates(DateTime date1, DateTime date2, int orgId);
}