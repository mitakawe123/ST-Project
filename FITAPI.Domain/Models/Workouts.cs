using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using FITAPI.Domain.DTOs;

namespace FITAPI.Domain.Models;

public class Workouts
{
    public long Id { get; init; }
    
    public required string Name { get; set; }
    
    public required string Description { get; set; }
    
    public required string ExercisesJson { get; set; }

    [NotMapped] 
    public List<WorkoutExercise>? Exercises =>
        string.IsNullOrEmpty(ExercisesJson) 
            ? []
            : JsonSerializer.Deserialize<List<WorkoutExercise>>(ExercisesJson);

    public required string UserId { get; init; } 
    
    public virtual MyUser User { get; init; }
}