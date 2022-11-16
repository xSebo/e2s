namespace WebApplication2.Models;

public class Customer{
    public int Id{ get; set; }
    public string FirstName{ get; set; } = null!;
    public string LastName{ get; set; } = null!;
    public string? Address{ get; set; } //? means non nullable
    public string? Phone{ get; set; }

}