namespace WebApplication2.Models;

public class UserOrgLink{
    public int Id{ get; set; }
    public virtual Organisation Organisation{ get; set; }
    public virtual User User{ get; set; }

    public UserOrgLink(){
        
    }
}