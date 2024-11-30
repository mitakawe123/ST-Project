using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace FITAPI.Domain.Models;

public class Workouts
{
    public long Id { get; init; }
    
    public required string Name { get; init; }
    
    public required string Description { get; init; }
    
    public required string ExercisesJson { get; init; }

    [NotMapped] 
    public List<WourkoutExercise>? Exercises
    {
        get => string.IsNullOrEmpty(ExercisesJson) 
            ? []
            : JsonSerializer.Deserialize<List<WourkoutExercise>>(ExercisesJson);
        init => ExercisesJson = JsonSerializer.Serialize(value);
    }    
    
    public required string UserId { get; init; } 
    
    public virtual MyUser User { get; init; }
    
    
}

public  class WourkoutExercise
{
    public required string Name { get; init; } 
    public ushort Sets { get; init; }         
    public ushort Reps { get; init; }  
}