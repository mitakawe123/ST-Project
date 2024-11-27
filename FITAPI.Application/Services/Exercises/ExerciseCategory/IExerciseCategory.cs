using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.Exercises.ExerciseCategory;

public interface IExerciseCategory
{
    Task<IReadOnlyCollection<ExerciseCategoryDto>> GetExerciseCategoriesAsync();
}