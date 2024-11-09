using FastEndpoints;
using FITAPI.Application.Services.ExerciseSearch;

namespace FITAPI.Endpoints;

public abstract record ExerciseSearchRequest(string Term);

public class GetExerciseSearchEndpoint(IExerciseSearch exerciseSearch) : Endpoint<ExerciseSearchRequest, IReadOnlyCollection<string>>
{
    public override void Configure()
    {
        Get("/exercise-search");
    }

    public override async Task HandleAsync(ExerciseSearchRequest req, CancellationToken ct)
    {
        var exercises = await exerciseSearch.GetExerciseSearchAsync(req.Term, ct);
        var exerciseNames = exercises.Suggestions.Select(ex => ex.Value).ToList();
        await SendAsync(exerciseNames, cancellation: ct).ConfigureAwait(false);
    }
}