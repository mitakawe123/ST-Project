using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Requests.Workouts;

public record CreateWorkoutRequest(
    string Email, 
    string WorkoutName,
    string Description,
    IReadOnlyCollection<WorkoutExercise> Exercises);
    
