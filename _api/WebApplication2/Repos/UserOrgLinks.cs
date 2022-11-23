using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Repos;

public class UserOrgLinks : IUserOrgLinks{
    private readonly E2SContext _e2sContext;

    public UserOrgLinks(E2SContext e2sContext){
        _e2sContext = e2sContext;
    }
    
    public UserOrgLink? ByUserId(int id){
        return _e2sContext.UserOrgLinks.FirstOrDefault(uo => uo.User.Id == id);
    }

    public List<UserOrgLink> ByOrgId(int id){
        return _e2sContext.UserOrgLinks.Where(link => link.Organisation.Id == id).ToList();
    }
}