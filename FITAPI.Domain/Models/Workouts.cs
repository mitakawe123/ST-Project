using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace FITAPI.Domain.Models;

public class Workouts
{
    public long Id { get; init; }
    
    public required string Name { get; init; }
    
    public required string ExercisesJson { get; init; }

    [NotMapped] 
    public List<Exercise>? Exercises
    {
        get => string.IsNullOrEmpty(ExercisesJson) 
            ? []
            : JsonSerializer.Deserialize<List<Exercise>>(ExercisesJson);
        init => ExercisesJson = JsonSerializer.Serialize(value);
    }    
    
    public required string UserId { get; init; } 
    
    public virtual required MyUser User { get; init; }
    
    public abstract class Exercise
    {
        public required string Name { get; set; } 
        public ushort Sets { get; set; }         
        public ushort Reps { get; set; }  
    }
}