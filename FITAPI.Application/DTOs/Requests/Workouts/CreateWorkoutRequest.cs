namespace FITAPI.Application.DTOs.Requests.Workouts;

public record CreateWorkoutRequest(
    string Email, 
    string WorkoutName,
    string Description,
    IReadOnlyCollection<Exercise> Exercises);
    
public record Exercise(string Name, ushort Reps, ushort Sets);