using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IUsers{

    public List<User> ToList();

    public User? ById(int Id);

    public User? ByEmail(string Email);

    public void Add(User User);

    public void Save();
    public void SaveAsync();

}