using FITAPI.Application.Services.Auth;
using FITAPI.Application.Services.Comments;
using FITAPI.Application.Services.CreateWorkout;
using FITAPI.Application.Services.ExerciseBaseInfo;
using FITAPI.Application.Services.ExerciseCategory;
using FITAPI.Application.Services.ExerciseSearch;
using FITAPI.Application.Services.NewsletterEmailSender;
using FITAPI.Application.Services.Posts;
using Microsoft.Extensions.DependencyInjection;

namespace FITAPI.Application.Configurations;

public static class  ServiceCollectionExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddHttpClient<IExerciseBaseInfo, ExerciseBaseInfo>();
        services.AddHttpClient<IExerciseCategory, ExerciseCategory>();
        services.AddHttpClient<IExerciseSearch, ExerciseSearch>();

        return services
            .AddScoped<IAuthService, AuthService>()
            .AddScoped<ICreateWorkoutService, CreateWorkoutService>()
            .AddScoped<IPostsService, PostsService>()
            .AddScoped<ICommentsService, CommentsService>()
            .AddSingleton<INewsletterEmailSender, NewsletterEmailSender>();
    }
    
    public static IServiceCollection AddCorsServices(this IServiceCollection services)
    {
        return services.AddCors(options =>
        {
            options.AddPolicy(name: "CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
    }
}