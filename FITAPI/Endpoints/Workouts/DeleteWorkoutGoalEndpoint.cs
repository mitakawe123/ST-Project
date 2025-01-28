using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts
{
    public class DeleteMyWorkoutGoalEndpoint(IWorkoutService workoutService) : Endpoint<DeleteMyWorkoutGoalRequest>
    {
        public override void Configure()
        {
            Delete("/my-workout-goals/{id}");
        }

        public override async Task HandleAsync(DeleteMyWorkoutGoalRequest req, CancellationToken ct)
        {
            await workoutService.DeleteMyWorkoutAsync(req, ct).ConfigureAwait(false);
            await SendAsync("Deleted my workout goal", cancellation: ct);
        }
    }
}
