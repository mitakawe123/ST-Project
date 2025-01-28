using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts
{
    public class GetMyWorkoutsGoalEndpoint(IWorkoutService workoutService) : Endpoint<MyWorkoutGoalsRequest, IReadOnlyCollection<MyWorkoutGoalsResponse>>
    {
        public override void Configure()
        {
            Get("/my-workout-goals");
        }

        public override async Task HandleAsync(MyWorkoutGoalsRequest req, CancellationToken ct)
        {
            var myWorkoutGoalsResponses = await workoutService.GetMyWorkoutGoalsAsync(req, ct).ConfigureAwait(false);
            await SendAsync(myWorkoutGoalsResponses, cancellation: ct).ConfigureAwait(false);
        }
    }
}
