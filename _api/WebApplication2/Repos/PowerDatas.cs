using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class PowerDatas : IPowerDatas{
    private readonly DbSet<PowerData> _powerData;

    public PowerDatas(E2SContext e2SContext){
        _powerData = e2SContext.PowerDatas;
    }

    public List<PowerData> ToList(){
        return _powerData.ToList();
    }

    public PowerData? ByDate(DateTime date){
        return _powerData.FirstOrDefault(pd => pd.Date == date);
    }

    public List<PowerData> ByDates(DateTime date1, DateTime date2) {
        return _powerData.Where(pd => pd.Date > date1 && pd.Date < date2).ToList();
    }
    
    public List<PowerData> ByDatesAndOrganisationId(DateTime date1, DateTime date2, int orgId)
    {
        return _powerData.Where(pd => pd.Date > date1 && pd.Date < date2 && pd.OrganisationId == orgId).ToList();
    }
}