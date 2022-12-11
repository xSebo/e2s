using WebApplication2.Models;

namespace WebApplication2.Repos;

public interface IBlacklistTokens {
    
    public BlacklistToken? ByValue(string token);
}