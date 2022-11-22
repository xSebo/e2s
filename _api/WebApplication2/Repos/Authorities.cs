using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Authorities : IAuthorities{
    private readonly DbSet<Authority> _authDb;

    public Authorities(E2SContext e2sContext){
        _authDb = e2sContext.Authorities;
    }
    public Authority? ById(int id){
        return _authDb.FirstOrDefault(a => a.Id == id);
    }

    public Authority? ByName(string name){
        return _authDb.FirstOrDefault(a => a.Name != null && a.Name.ToLower() == name.ToLower());
    }
}