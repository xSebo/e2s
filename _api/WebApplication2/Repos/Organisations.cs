using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Organisations : IOrganisations{
    private readonly DbSet<Organisation> _orgDb;
    private readonly IDbUtils _dbUtils;

    public Organisations(E2SContext orgDb, IDbUtils dbUtils){
        _orgDb = orgDb.Organisations;
        _dbUtils = dbUtils;
    }
    
    public List<Organisation> ToList(){
        return _orgDb.ToList();
    }

    public Organisation? ById(int id){
        return _orgDb.SingleOrDefault(o => o.Id == id);
    }

    public Organisation? ByName(string name){
        return _orgDb.SingleOrDefault(o => o.Name.ToLower() == name.ToLower());
    }

    public void Add(Organisation organisation){
        _orgDb.Add(organisation);
    }

    public void Save(){
        _dbUtils.SaveChanges();
    }

    public void SaveAsync(){
        _dbUtils.SaveChangesAsync();
    }
}