using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts
{
   public class CreateWorkoutGoalEndpoint(IWorkoutService workoutService) : Endpoint<CreateWorkoutGoalRequest>
{
    public override void Configure()
    {
        Post("/create-workout-goal");
    }

    public override async Task HandleAsync(CreateWorkoutGoalRequest req, CancellationToken ct)
    {
        await workoutService.CreateWorkoutGoalAsync(req, ct);
            await SendAsync("Workout Goal Created Successfuly", cancellation: ct);
        }
}
}
