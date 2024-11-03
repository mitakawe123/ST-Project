using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.WgerService;

public interface IWgerService
{
    Task<ExerciseResponseDto> GetExercisesAsync();

    Task<IReadOnlyCollection<ExerciseCategoryDto>> GetExerciseCategoriesAsync();
}