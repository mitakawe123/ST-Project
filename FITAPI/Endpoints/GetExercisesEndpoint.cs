using FastEndpoints;
using FITAPI.Application.Services.ExerciseBaseInfo;
using FITAPI.Domain.DTOs;

namespace FITAPI.Endpoints;

public class GetExercisesEndpoint(IExerciseBaseInfo exerciseBaseInfo) : EndpointWithoutRequest<ExerciseDto>
{
    public override void Configure()
    {
        Get("/exercises");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercises = await exerciseBaseInfo.GetExercisesAsync();
        await SendAsync(exercises, cancellation: ct).ConfigureAwait(false);
    }
}