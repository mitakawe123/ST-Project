using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class TopWorkoutsEndpoint(IWorkoutService workoutService) : Endpoint<TopWorkoutsRequest, IReadOnlyCollection<TopWorkoutsResponse>>
{
    public override void Configure()
    {
        Get("/top-workouts");
    }

    public override async Task HandleAsync(TopWorkoutsRequest req, CancellationToken ct)
    {
        var topWorkoutsResponses = await workoutService.GetTopWorkoutsAsync(req, ct).ConfigureAwait(false);
        await SendAsync(topWorkoutsResponses, cancellation: ct).ConfigureAwait(false);
    }
}