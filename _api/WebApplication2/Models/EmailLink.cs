using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class EmailLink{
    [Key]
    public int Id{ get; set; }
    
    public virtual User User{ get; set; }
    
    public bool Weekly{ get; set; }
    public bool Monthly{ get; set; }
    public bool Yearly{ get; set; }

    public EmailLink(){
        
    }
    
}