using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.ExerciseSearch;

public interface IExerciseSearch
{
    Task<ExerciseSearchDto> GetExerciseSearchAsync(string term, CancellationToken cancellationToken);
}