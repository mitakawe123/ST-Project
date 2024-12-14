namespace FITAPI.Domain.DTOs;

public record WorkoutExercise(string Name, ushort Reps, ushort Sets)
{
    public string Name { get; set; } = Name;
    
    public ushort Reps { get; set; } = Reps;
    
    public ushort Sets { get; set; } = Sets;
}