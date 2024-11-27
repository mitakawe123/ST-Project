using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.Exercises.ExerciseBaseInfo;

public interface IExerciseBaseInfo
{
    Task<ExerciseDto> GetExercisesAsync();
}