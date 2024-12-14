using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class EditWorkoutEndpoint(IWorkoutService workoutService) : Endpoint<EditWorkoutRequest>
{
    public override void Configure()
    {
        Patch("/edit-workout");
    }

    public async override Task HandleAsync(EditWorkoutRequest req, CancellationToken ct)
    {
        await workoutService.EditWorkoutAsync(req, ct).ConfigureAwait(false);
        await SendAsync($"Successfully edit workout: {req.Id}", cancellation: ct).ConfigureAwait(false);
    }
}