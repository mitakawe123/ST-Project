using FastEndpoints;
using FITAPI.Application.Services.WgerService;

namespace FITAPI.Endpoints;

public class GetExercisesEndpoint(IWgerService wgerService) : EndpointWithoutRequest<string>
{
    public override void Configure()
    {
        Get("api/exercises");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercises = await wgerService.GetExercisesAsync();
        await SendAsync(exercises, cancellation: ct);
    }
}