using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IPowerDatas{
    public List<PowerData> ToList();
    public List<PowerData> ByDate(DateTime date);
}