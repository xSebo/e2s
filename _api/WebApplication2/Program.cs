using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;


var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

string connectionString = config.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();

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

var app = builder.Build();

app.UseCors(options =>
    options.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader());

app.UseAuthorization();
app.MapControllers();
app.Run();