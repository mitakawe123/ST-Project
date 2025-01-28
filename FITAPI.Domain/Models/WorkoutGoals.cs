using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using FITAPI.Domain.DTOs;



namespace FITAPI.Domain.Models
{
    public class WorkoutGoals
    {
        public long Id { get; set; }

        public required string GoalName { get; set; }

        public required string GoalDescription { get; set; }

        public required string GoalsJson { get; set; }

        public required DateTime LoggedAt { get; set; } = DateTime.UtcNow;

        [NotMapped]
        public List<WorkoutGoal> Goals =>
    string.IsNullOrEmpty(GoalsJson)
        ? new List<WorkoutGoal>()
        : JsonSerializer.Deserialize<List<WorkoutGoal>>(GoalsJson) ?? new List<WorkoutGoal>();



        public required string UserId { get; init; }

        public MyUser User { get; init; }
    }
}
