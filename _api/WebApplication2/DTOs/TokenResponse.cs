namespace WebApplication2.DTOs;

public class TokenResponse{
    public string JWTtoken{ get; set; }
    public string RefreshToken{ get; set; }
    
    public string Roles { get; set; }

}