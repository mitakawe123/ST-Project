using System.Text.Json;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Domain.DTOs;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Application.Services.Workouts;

public class WorkoutService(FitDbContext context, UserManager<MyUser> userManager) : IWorkoutService
{
    private const short TopWorkoutsLimit = 20;
    
    public async Task CreateWorkoutAsync(CreateWorkoutRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new Exception($"User with email {request.Email} does not exist");

        var exercises = request.Exercises.Select(ex => new WorkoutExercise(ex.Name, ex.Reps, ex.Sets)).ToList();

        context.Add(new Domain.Models.Workouts
        {
            UserId = user.Id,
            Description = request.Description,
            Name = request.WorkoutName,
            ExercisesJson = JsonSerializer.Serialize(exercises)
        });
        
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<MyWorkoutsResponse>> GetMyWorkoutsAsync(MyWorkoutsRequest request, CancellationToken cancellationToken)
    {
        var user  = await userManager.FindByEmailAsync(request.Email)
            ?? throw new Exception($"User with email {request.Email} does not exist");

        return await context.Workouts
            .Where(x => x.UserId == user.Id)
            .Select(x => new MyWorkoutsResponse(x.Id, x.Name, x.Description, x.Exercises ?? new List<WorkoutExercise>()))
            .ToListAsync(cancellationToken);
    }

    public async Task DeleteMyWorkoutAsync(DeleteMyWorkoutRequest request, CancellationToken cancellationToken)
    {
        await context.Workouts
            .Where(x => x.Id == request.Id)
            .ExecuteDeleteAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<TopWorkoutsResponse>> GetTopWorkoutsAsync(TopWorkoutsRequest request, CancellationToken cancellationToken)
    {
        // Exclude the current user's workouts
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new Exception($"User with email {request.Email} does not exist");

        return await context.Workouts
            .Include(x => x.User)
            .Where(x => x.UserId != user.Id)
            .OrderBy(x => Guid.NewGuid()) // Randomize the order
            .Take(TopWorkoutsLimit) // Take the top N workouts
            .Select(x => new TopWorkoutsResponse(
                x.Id, 
                (x.User.UserName ?? x.User.Email) ?? string.Empty, 
                x.Name,
                x.Description, 
                x.Exercises ?? new List<WorkoutExercise>()))
            .ToListAsync(cancellationToken);
    }

    public async Task EditWorkoutAsync(EditWorkoutRequest request, CancellationToken cancellationToken)
    {
        var workout = await context.Workouts
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
    
        if (workout is null)
            throw new ArgumentNullException($"Workout not found {request.Id}");

        workout.Name = string.IsNullOrEmpty(request.Title) ? workout.Name : request.Title;
        workout.Description = string.IsNullOrEmpty(request.Description) ? workout.Description : request.Description;

        if (request.Exercises is not null && request.Exercises.Count != 0)
            workout.ExercisesJson = JsonSerializer.Serialize(request.Exercises);

        context.Workouts.Update(workout);
        await context.SaveChangesAsync(cancellationToken);
    }
}   