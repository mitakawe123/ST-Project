using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class GetMyWorkoutsEndpoint(IWorkoutService workoutService) : Endpoint<MyWorkoutsRequest, IReadOnlyCollection<MyWorkoutsResponse>>
{
    public override void Configure()
    {
        Get("/my-workouts");
    }

    public override async Task HandleAsync(MyWorkoutsRequest req, CancellationToken ct)
    {
        var myWorkoutsResponses = await workoutService.GetMyWorkoutsAsync(req, ct).ConfigureAwait(false);
        await SendAsync(myWorkoutsResponses, cancellation: ct).ConfigureAwait(false);
    }
}