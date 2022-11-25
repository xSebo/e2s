using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;

namespace Tests;

public class Startup{
    public static ServiceProvider GetServices(){
        var services = new ServiceCollection();
        var config = new ConfigurationManager()
            .AddJsonFile("appsettings.json", optional: false)
            .Build();
        string connectionString = config.GetConnectionString("DefaultConnection");
        MariaDbServerVersion serverVersion = new MariaDbServerVersion(new Version(10, 7, 4));
        services.AddDbContext<E2SContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .UseLazyLoadingProxies()
        );

        services.AddTransient<IJwt, Jwt>();
        services.AddTransient<IUsers, Users>();
        services.Configure<JWTKey>(config.GetSection(JWTKey.Position));
        services.AddScoped<IDbUtils, DbUtils>();
        services.AddScoped<IAuthorities, Authorities>();
        services.AddScoped<IOrganisations, Organisations>();

        return services.BuildServiceProvider();
    }
}