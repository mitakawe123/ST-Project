using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Responses.Workouts;

public record TopWorkoutsResponse(
    long Id,
    string WorkoutOwnerName,
    string WorkoutName,
    string WorkoutDescription,
    IReadOnlyCollection<WorkoutExercise> Exercises);