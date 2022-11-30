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

    public List<PowerData> ByDate(DateTime date){
        return _powerData.Where(pd => pd.Date == date).ToList();
    }
}