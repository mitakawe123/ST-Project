using FITAPI.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Responses.Workouts;

public record MyWorkoutGoalsResponse(
     long Id,
     string WorkoutGoalOwnerName,
     string WorkoutGoalName,
     DateTime LoggedAt,
    IReadOnlyCollection<WorkoutGoal> Goals
);

