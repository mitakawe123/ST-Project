using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Profile;
using FITAPI.Application.Services.Workouts;

namespace FITAPI.Endpoints.Workouts;

public class GetMyWorkoutsByDateEndpoint(IProfileService profileService) : Endpoint<MyWorkoutsByDateRequest, IReadOnlyCollection<MyWorkoutsResponse>>
{
    public override void Configure()
    {
        Get("/my-workouts-date");
    }

    public override async Task HandleAsync(MyWorkoutsByDateRequest req, CancellationToken ct)
    {
        var myWorkoutsResponses = await profileService.GetMyWorkoutsByDateAsync(req, ct).ConfigureAwait(false);
        await SendAsync(myWorkoutsResponses, cancellation: ct).ConfigureAwait(false);
    }
}