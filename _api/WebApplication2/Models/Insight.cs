using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApplication2.DTOs;

namespace WebApplication2.Models;

public class Insight {
    
    [Key] 
    public int Id { get; set; }
    public virtual Organisation Organisation { get; set; } = null!;
    public string Type { get; set; } = null!;
    public string Text { get; set; } = null!;
    
    public InsightDTO ToDto() {
        return new InsightDTO(this.Type, this.Text);
    }
}