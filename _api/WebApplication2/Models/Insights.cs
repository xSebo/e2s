using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class Insights
{
    [Key] public int Id{ get; set; }
    
    public virtual Organisation Organisation{ get; set; }
    
    public string Type{ get; set; }
    
    public string Insight{ get; set; }
    
}