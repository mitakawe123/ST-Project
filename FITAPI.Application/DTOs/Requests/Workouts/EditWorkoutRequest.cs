namespace FITAPI.Application.DTOs.Requests.Workouts;

public record EditWorkoutRequest(
    long Id,
    string? Title,
    string? Description,
    IReadOnlyCollection<WorkoutExerciseEdit>? Exercises);
    
public record WorkoutExerciseEdit(string? Name, ushort? Reps, ushort? Sets);