using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class DeleteMyWorkoutEndpoint(IWorkoutService workoutService) : Endpoint<DeleteMyWorkoutRequest>
{
    public override void Configure()
    {
        Delete("/my-workouts/{id}");
    }

    public override async Task HandleAsync(DeleteMyWorkoutRequest req, CancellationToken ct)
    {
        await workoutService.DeleteMyWorkoutAsync(req, ct).ConfigureAwait(false);
        await SendAsync("Deleted my workout", cancellation: ct);
    }
}