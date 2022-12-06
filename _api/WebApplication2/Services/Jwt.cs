using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApplication2.Data;
using WebApplication2.DTOs;
using WebApplication2.Models;

namespace WebApplication2.Services;

public class Jwt : IJwt{
    private readonly string _secret;
    private readonly E2SContext _e2sContext;

    public Jwt(IOptions<JWTKey> secret, E2SContext e2SContext){
        _secret = secret.Value.Key;
        _e2sContext = e2SContext;
    }

    public string GetKey(){
        return _secret;
    }

    public string GenJwt(User user){
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.UTF8.GetBytes(_secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Authority.Name!),
                    new Claim("organisationId", user.Organisation.Id.ToString())
                }
            ),
            Expires = DateTime.Now.AddMinutes(180),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        string finalToken = tokenHandler.WriteToken(token);
        return finalToken;
        
    }

    public string RefreshToken(User user){
        var randomNumber = new byte[32];
        using var randomNumberGenerator = RandomNumberGenerator.Create();
        randomNumberGenerator.GetBytes(randomNumber);
        string refreshToken = Convert.ToBase64String(randomNumber);
        UserToken userToken = _e2sContext.UserTokens.FirstOrDefault(x => x.User == user);
        if (userToken != null){
            userToken.RefreshToken = refreshToken;
            _e2sContext.SaveChanges();
        }
        else{
            userToken = new UserToken{
                User = user,
                TokenId = 0,
                RefreshToken = refreshToken,
                IsActive = 1
            };
            _e2sContext.UserTokens.Add(userToken);
            _e2sContext.SaveChanges();
        }
        userToken.RefreshToken = refreshToken;
        _e2sContext.SaveChanges();

        return refreshToken;
    }

    public RefreshResponse RefreshJwt(TokenResponse token){
        RefreshResponse refreshResponse = new RefreshResponse(){
            Response = new TokenResponse(){
                JWTtoken = "",
                RefreshToken = ""
            },
            Unauthorised = false
        };
        
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        ClaimsPrincipal principle = tokenHandler.ValidateToken(token.JWTtoken, new TokenValidationParameters{
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew=TimeSpan.Zero
        }, out var securityToken);

        if (securityToken is JwtSecurityToken jwtSecurityToken && !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256)){
            refreshResponse.Unauthorised = true;
            return refreshResponse;
        }

        if (principle.Identity != null){
            int id = Convert.ToInt32(principle.Identity.Name);
            User user = _e2sContext.Users.FirstOrDefault(o=> o.Id == id)!;
            var refTable = _e2sContext.UserTokens.FirstOrDefault(o => o.User.Id == user.Id && o.RefreshToken == token.RefreshToken);
            if (refTable == null){
                refreshResponse.Unauthorised = true;
                return refreshResponse;
            }
        
            TokenResponse result = Authenticate(user, principle.Claims.ToArray());

            refreshResponse.Response = result;
        }

        return refreshResponse;
    }

    public TokenResponse Authenticate(User user, Claim[] claims){
        TokenResponse tokenResponse = new TokenResponse();
        byte[] tokenKey = Encoding.UTF8.GetBytes(_secret);
        var tokenHandler = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(180),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256)
        );
        tokenResponse.JWTtoken = new JwtSecurityTokenHandler().WriteToken(tokenHandler);
        tokenResponse.RefreshToken = RefreshToken(user);
        return tokenResponse;

    }
}

public class RefreshResponse{
    public bool Unauthorised{ get; set; }
    public TokenResponse Response{ get; set; } = null!;
}