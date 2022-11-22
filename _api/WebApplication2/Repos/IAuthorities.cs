using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IAuthorities{
    public Authority? ById(int id);
    public Authority? ByName(string name);
}