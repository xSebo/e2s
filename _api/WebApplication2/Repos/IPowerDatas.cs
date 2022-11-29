using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IPowerDatas{
    public List<PowerData> ToList();
    public PowerData? ByDate(DateTime date);
    public List<PowerData> ByDates(DateTime date1, DateTime date2);
}