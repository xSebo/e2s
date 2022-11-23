using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.Services;

var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

builder.Services.AddControllers();

string connectionString = config.GetConnectionString("DefaultConnection");
MariaDbServerVersion serverVersion = new MariaDbServerVersion(new Version(10, 7, 4));
builder.Services.AddDbContext<E2SContext>(
    dbContextOptions => dbContextOptions
        .UseMySql(connectionString, serverVersion)
        .UseLazyLoadingProxies()
        // The following three options help with debugging, but should
        // be changed or removed for production.
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

builder.Services.Configure<JWTKey>(builder.Configuration.GetSection(JWTKey.Position));
builder.Services.AddScoped<IJwt, Jwt>();


string authKey = config.GetSection(JWTKey.Position + ":Key").Value;

builder.Services.AddAuthentication(item =>
{
    item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(item =>
{

    item.RequireHttpsMetadata = true;
    item.SaveToken = true;
    item.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew=TimeSpan.Zero
    };
});

var app = builder.Build();
app.UseCors(options =>
    options.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .WithHeaders("access-control-allow-credentials","access-control-allow-origin","content-type","authorization").AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();