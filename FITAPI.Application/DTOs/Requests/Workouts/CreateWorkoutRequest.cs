namespace FITAPI.Application.DTOs.Requests.Workouts;

public record CreateWorkoutRequest(
    string Email, 
    string WorkoutName,
    string Description,
    IReadOnlyCollection<string> ExerciseNames,
    IReadOnlyCollection<ushort> Reps, 
    IReadOnlyCollection<ushort> Sets);