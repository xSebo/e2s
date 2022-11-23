using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IUserOrgLinks{

    public UserOrgLink? ByUserId(int id);

    public List<UserOrgLink> ByOrgId(int id);
}