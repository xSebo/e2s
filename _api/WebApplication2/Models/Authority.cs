using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class Authority{
    
    [Key]
    public int? Id{ get; set; }
    public string? Name{ get; set; }
    
}