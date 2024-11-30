using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class CreateWorkoutEndpoint(IWorkoutService workoutService) : Endpoint<CreateWorkoutRequest>
{
    public override void Configure()
    {
        Post("/create-workout");
    }

    public override async Task HandleAsync(CreateWorkoutRequest req, CancellationToken ct)
    {
        await workoutService.CreateWorkoutAsync(req, ct);
        await SendAsync("Workout Created", cancellation: ct);
    }
}