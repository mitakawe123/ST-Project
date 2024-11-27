using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Exercises;
using FITAPI.Application.Services.Exercises.ExerciseSearch;

namespace FITAPI.Endpoints.Exercises;

public class GetExerciseSearchEndpoint(IExerciseSearch exerciseSearch) : Endpoint<ExerciseSearchRequest, IReadOnlyCollection<string>>
{
    public override void Configure()
    {
        Get("/exercise-search");
    }

    public override async Task HandleAsync(ExerciseSearchRequest req, CancellationToken ct)
    {
        var exercises = await exerciseSearch.GetExerciseSearchAsync(req.Term, ct);
        var exerciseNames = exercises.Suggestions?.Select(ex => ex.Value).Distinct().ToList() ?? new List<string>();
        await SendAsync(exerciseNames, cancellation: ct).ConfigureAwait(false);
    }
}