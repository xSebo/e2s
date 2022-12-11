using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class BlacklistToken
{
    [Key] public int Id{ get; set; }

    public string? JwTtoken { get; set; } = null!;

}