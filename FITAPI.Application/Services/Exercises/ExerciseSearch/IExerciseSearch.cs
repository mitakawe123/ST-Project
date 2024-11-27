using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.Exercises.ExerciseSearch;

public interface IExerciseSearch
{
    Task<ExerciseSearchDto> GetExerciseSearchAsync(string term, CancellationToken cancellationToken);
}