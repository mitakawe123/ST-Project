using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.ExerciseCategory;

public interface IExerciseCategory
{
    Task<IReadOnlyCollection<ExerciseCategoryDto>> GetExerciseCategoriesAsync();
}