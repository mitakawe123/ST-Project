using System.Text.Json;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Application.Services.Workouts;

public class WorkoutService(FitDbContext context, UserManager<MyUser> userManager) : IWorkoutService
{
    public async Task CreateWorkoutAsync(CreateWorkoutRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new Exception($"User with email {request.Email} does not exist");

        var exercises = request.Exercises.Select(ex => 
            new WourkoutExercise
            {
                Name = ex.Name,
                Reps = ex.Reps, 
                Sets = ex.Sets,
            }).ToList();

        context.Add(new Domain.Models.Workouts
        {
            UserId = user.Id,
            Description = request.Description,
            Name = request.WorkoutName,
            ExercisesJson = JsonSerializer.Serialize(exercises)
        });
        
        await context.SaveChangesAsync(cancellationToken);
    }
}   