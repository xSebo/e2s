using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class UserTransferDTO{
    public int Id{ get; set; }
    public string Name{ get; set; }
    public string Email{ get; set; }
    
    public  UserTransferDTO(User user){
        Id = user.Id;
        Name = user.Name;
        Email = user.Email;
    }
}