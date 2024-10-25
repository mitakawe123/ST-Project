using FITAPI.Application.Services.WgerService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FITAPI.Infrastructure.Configurations;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<FITDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
        
        return services;
    }
    
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddHttpClient<IWgerService, WgerService>();
        return services;
    }
}   