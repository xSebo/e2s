using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class User{
    [Key] public int Id{ get; set; }
    public string? Name{ get; set; } = null!;
    public string? Password{ get; set; } = null!;
    public string? Email{ get; set; } = null!;

    public virtual Authority Authority{ get; set; } = null!;

    public virtual Organisation Organisation{ get; set; } = null!;
    
    public User(){
    }
}