namespace FITAPI.Domain.DTOs;

public record CreateWorkoutDto(
    string WorkoutName,
    string Description,
    List<CreateWorkoutExerciseDto> Exercises);
    
public abstract record CreateWorkoutExerciseDto(
    string Name,
    ushort Sets,
    ushort Reps);