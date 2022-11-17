using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class User{
    [Key] public int Id{ get; set; }
    public string? Name{ get; set; } = null!;
    public string? Password{ get; set; }
    public string? Email{ get; set; }

    public virtual Authority Authority{ get; set; }
    
    public User(){
    }
}