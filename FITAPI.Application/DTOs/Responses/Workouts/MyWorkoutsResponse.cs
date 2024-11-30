using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Responses.Workouts;

public record MyWorkoutsResponse(
    long Id,
    string WorkoutName,
    string WorkoutDescription,
    IReadOnlyCollection<WorkoutExercise> Exercises);