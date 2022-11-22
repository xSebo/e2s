namespace WebApplication2.Models;

public class UserToken{
    public int Id{ get; set; }
    public virtual User User{ get; set; } = null!;
    public int TokenId{ get; set; }
    public string RefreshToken{ get; set; } = null!;
    public int IsActive{ get; set; }
}
