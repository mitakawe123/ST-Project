using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.ExerciseBaseInfo;

public interface IExerciseBaseInfo
{
    Task<ExerciseDto> GetExercisesAsync();
}