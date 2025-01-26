using FITAPI.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Responses.Profile;

public record GetWorkoutResponse(
    long Id,
    string WorkoutName,
    string WorkoutDescription,
    IReadOnlyCollection<WorkoutExercise> Exercises);
