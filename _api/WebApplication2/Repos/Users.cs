using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Users : IUsers{
    private readonly DbSet<User> _userDb;
    private readonly DBUtils _dbUtils;

    public Users(E2SContext e2sContext, DBUtils dbUtils){
        _userDb = e2sContext.Users;
        _dbUtils = dbUtils;
    }
    
    public List<User> ToList(){
        return _userDb.ToList();
    }

    public User? ById(int id){
        return _userDb.FirstOrDefault(u => u.Id == id);
    }

    public User? ByEmail(string email){
        return _userDb.FirstOrDefault(u => u.Email != null && u.Email.ToLower() == email.ToLower());
    }

    public void Add(User user){
        _userDb.Add(user);
    }

    public void Save(){
        _dbUtils.SaveChanges();
    }

    public void SaveAsync(){
        _dbUtils.SaveChangesAsync();
    }
}