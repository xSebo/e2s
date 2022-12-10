using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Services;

public class UserService : IUserService {
    private readonly IUsers _users;

    public UserService(IUsers users) {
        _users = users;
    }

    public List<UserEmailDTO> GetAllUsersToEmail() {
        List<User> usersList = _users.ToList();
        List<UserEmailDTO> usersToEmail = new List<UserEmailDTO>();
        usersList.ForEach(user => usersToEmail.Add(new UserEmailDTO(user)));
        return usersToEmail;
    }
}