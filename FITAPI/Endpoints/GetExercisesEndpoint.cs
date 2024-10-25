using FastEndpoints;
using FITAPI.Application.Services.WgerService;
using FITAPI.Domain.DTOs;

namespace FITAPI.Endpoints;

public class GetExercisesEndpoint(IWgerService wgerService) : EndpointWithoutRequest<ExerciseResponseDto>
{
    public override void Configure()
    {
        Get("/exercises");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercises = await wgerService.GetExercisesAsync();
        await SendAsync(exercises, cancellation: ct).ConfigureAwait(false);
    }
}