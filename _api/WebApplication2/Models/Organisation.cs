using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class Organisation{
    [Key]
    public int Id{ get; set; }
    public string Name{ get; set; }
    public string Logo{ get; set; }

    public Organisation(){
        
    }
}