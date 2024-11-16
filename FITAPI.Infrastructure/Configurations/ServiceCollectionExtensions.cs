using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace FITAPI.Infrastructure.Configurations;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<FitDbContext>((serviceProvider, options) =>
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            var connectionStringBuilder = new NpgsqlConnectionStringBuilder(connectionString);
            var searchPaths = connectionStringBuilder.SearchPath?.Split(',');

            options.UseNpgsql(connectionString, o =>
            {
                if (searchPaths is { Length: > 0 })
                {
                    var mainSchema = searchPaths[0];
                    o.MigrationsHistoryTable(HistoryRepository.DefaultTableName, mainSchema);
                }
            });
        });
        
        return services;
    }

    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentity<MyUser, IdentityRole>()
            .AddEntityFrameworkStores<FitDbContext>()
            .AddSignInManager<SignInManager<MyUser>>();
        
        return services;
    }
}   