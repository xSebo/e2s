using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class Users : IUsers{
    private readonly DbSet<User> _userDb;
    private readonly IDbUtils _dbUtils;
    private readonly IEmailLinks _emailLinks;
    private readonly E2SContext _e2sContext;

    public Users(E2SContext e2sContext, IDbUtils dbUtils, IEmailLinks emailLinks){
        _userDb = e2sContext.Users;
        _e2sContext = e2sContext;
        _dbUtils = dbUtils;
        _emailLinks = emailLinks;
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

    public List<User> ByOrgId(int id){
        return _userDb.Where(u => u.Organisation.Id == id).ToList();
    }

    public void Add(User user){
        _e2sContext.EmailLinks.Add(new EmailLink{
            User = user,
            Weekly = false,
            Monthly = false,
            Yearly = false
        });
        _userDb.Add(user);
    }

    public void Save(){
        _dbUtils.SaveChanges();
    }

    public void SaveAsync(){
        _dbUtils.SaveChangesAsync();
    }
}