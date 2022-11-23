using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IOrganisations{
    public List<Organisation> ToList();

    public Organisation? ById(int id);

    public Organisation? ByName(string name);
    
    public void Add(Organisation organisation);
    public void Save();
    public void SaveAsync();
}