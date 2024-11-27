namespace FITAPI.Application.DTOs.Requests.Workouts;

public record CreateWorkoutRequest(string Email, IReadOnlyCollection<string> ExerciseNames, IReadOnlyCollection<int> Reps, IReadOnlyCollection<int> Sets);