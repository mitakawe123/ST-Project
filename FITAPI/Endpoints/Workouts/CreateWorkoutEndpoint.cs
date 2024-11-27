using FastEndpoints;
using FITAPI.Application.DTOs.Requests;
using FITAPI.Application.DTOs.Requests.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class CreateWorkoutEndpoint : Endpoint<CreateWorkoutRequest>
{
    public override void Configure()
    {
        Post("/create-workout");
    }

    public override Task HandleAsync(CreateWorkoutRequest req, CancellationToken ct)
    {
        return base.HandleAsync(req, ct);
    }
}