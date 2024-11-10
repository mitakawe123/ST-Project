using FastEndpoints;
using FITAPI.Application.Services.ExerciseSearch;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints;

public record ExerciseSearchRequest(string Term);

public class GetExerciseSearchEndpoint(IExerciseSearch exerciseSearch) : Endpoint<ExerciseSearchRequest, IReadOnlyCollection<string>>
{
    public override void Configure()
    {
        Get("/exercise-search");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(ExerciseSearchRequest req, CancellationToken ct)
    {
        var exercises = await exerciseSearch.GetExerciseSearchAsync(req.Term, ct);
        var exerciseNames = exercises.Suggestions.Select(ex => ex.Value).ToList();
        await SendAsync(exerciseNames, cancellation: ct).ConfigureAwait(false);
    }
}