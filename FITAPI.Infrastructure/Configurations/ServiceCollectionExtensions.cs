using FITAPI.Application.Services.Auth;
using FITAPI.Application.Services.ExerciseBaseInfo;
using FITAPI.Application.Services.ExerciseCategory;
using FITAPI.Application.Services.ExerciseSearch;
using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FITAPI.Infrastructure.Configurations;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<FitDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
        
        return services;
    }
    
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddHttpClient<IExerciseBaseInfo, ExerciseBaseInfo>();
        services.AddHttpClient<IExerciseCategory, ExerciseCategory>();
        services.AddHttpClient<IExerciseSearch, ExerciseSearch>();

        services.AddScoped<IAuthService, AuthService>();
        
        return services;
    }

    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentity<MyUser, IdentityRole>()
            .AddEntityFrameworkStores<FitDbContext>()
            .AddSignInManager<SignInManager<MyUser>>();
        
        return services;
    }

    public static IServiceCollection AddCorsServices(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: "CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return services;
    }
}   