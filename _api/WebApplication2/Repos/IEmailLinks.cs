using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IEmailLinks{

    public List<EmailLink> ToList();
    public EmailLink? ByUser(int id);
    public EmailLink? ByUser(User user);
    public void Add(EmailLink emailLink);
    public void Save();
    public void SaveAsync();


}