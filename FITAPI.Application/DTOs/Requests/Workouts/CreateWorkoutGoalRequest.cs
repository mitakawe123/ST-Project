using FITAPI.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Requests.Workouts
{
    public record CreateWorkoutGoalRequest(
        string Email,
        IReadOnlyCollection<WorkoutGoal> Goals
    );
}
