using FITAPI.Application.Services.Auth;
using FITAPI.Application.Services.Comments;
using FITAPI.Application.Services.Contact;
using FITAPI.Application.Services.Exercises.ExerciseBaseInfo;
using FITAPI.Application.Services.Exercises.ExerciseCategory;
using FITAPI.Application.Services.Exercises.ExerciseSearch;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Application.Services.NewsletterEmailSender;
using FITAPI.Application.Services.Posts;
using FITAPI.Application.Services.Workouts;
using Microsoft.Extensions.DependencyInjection;

namespace FITAPI.Application.Configurations;

public static class  ServiceCollectionExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddHttpClient<IExerciseBaseInfo, ExerciseBaseInfo>();
        services.AddHttpClient<IExerciseCategory, ExerciseCategory>();
        services.AddHttpClient<IExerciseSearch, ExerciseSearch>();
        services.AddHttpClient<IHealthTrackerService, HealthTrackerService>();

        return services
            .AddScoped<IAuthService, AuthService>()
            .AddScoped<IWorkoutService, WorkoutService>()
            .AddScoped<IPostsService, PostsService>()
            .AddScoped<ICommentsService, CommentsService>()
            .AddScoped<IContactService, ContactService>()
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