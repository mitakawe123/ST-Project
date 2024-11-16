using FITAPI.Application.Services.Auth;
using FITAPI.Application.Services.ExerciseBaseInfo;
using FITAPI.Application.Services.ExerciseCategory;
using FITAPI.Application.Services.ExerciseSearch;
using FITAPI.Application.Services.NewsletterEmailSender;
using Microsoft.Extensions.DependencyInjection;

namespace FITAPI.Application.Configurations;

public static class  ServiceCollectionExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddHttpClient<IExerciseBaseInfo, ExerciseBaseInfo>();
        services.AddHttpClient<IExerciseCategory, ExerciseCategory>();
        services.AddHttpClient<IExerciseSearch, ExerciseSearch>();

        services
            .AddScoped<IAuthService, AuthService>()
            .AddSingleton<INewsletterEmailSender, NewsletterEmailSender>();
            
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