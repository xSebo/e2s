using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class EmailLinks : IEmailLinks{
    private readonly DbSet<EmailLink> _emailLinks;
    private readonly IDbUtils _dbUtils;

    public EmailLinks(E2SContext e2sContext, IDbUtils dbUtils){
        _emailLinks = e2sContext.EmailLinks;
        _dbUtils = dbUtils;
    }
    
    public List<EmailLink> ToList(){
        return _emailLinks.ToList();
    }

    public EmailLink? ByUser(int id){
        return _emailLinks.FirstOrDefault(el => el.User.Id == id);
    }

    public EmailLink? ByUser(User user){
        return _emailLinks.FirstOrDefault(el => el.User == user);
    }

    public void Add(EmailLink emailLink){
        _emailLinks.Add(emailLink);
    }

    public void Save(){
        _dbUtils.SaveChanges();
    }

    public void SaveAsync(){
        _dbUtils.SaveChangesAsync();
    }
}