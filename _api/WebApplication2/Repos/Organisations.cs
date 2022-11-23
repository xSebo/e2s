using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Organisations : IOrganisations{
    private readonly E2SContext _e2sContext;

    public Organisations(E2SContext e2sContext){
        _e2sContext = e2sContext;
    }
    
    public List<Organisation> ToList(){
        return _e2sContext.Organisations.ToList();
    }

    public Organisation? ById(int id){
        return _e2sContext.Organisations.SingleOrDefault(o => o.Id == id);
    }

    public Organisation? ByName(string name){
        return _e2sContext.Organisations.SingleOrDefault(o => o.Name.ToLower() == name.ToLower());
    }
}