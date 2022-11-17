using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApplication2.Data;
using WebApplication2.Models;

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

var app = builder.Build();

app.MapControllers();
app.Run();