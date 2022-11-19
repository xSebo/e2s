﻿using System.Security.Claims;
using WebApplication2.DTOs;
using WebApplication2.Models;

namespace WebApplication2.Services;

public interface IJwt{
    public string GetKey();
    public string GenJwt(User user);
    public string RefreshToken(User user);

    public RefreshResponse RefreshJwt(TokenResponse token);

    public TokenResponse Authenticate(User user, Claim[] claims);
    
    
}