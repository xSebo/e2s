using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Services;

public interface IUserService {
    public List<UserEmailDTO> GetAllUsersToEmail();
}