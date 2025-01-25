using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.Services.Profile;
using FastEndpoints;
using FITAPI.Application.DTOs.Responses.HealthTracker;

namespace FITAPI.Endpoints.Profile
{
    public class GetLoggedFoodByDateEndpoint(IProfileService profileService) : Endpoint<LoggedFoodByDateRequest, IReadOnlyCollection<LoggedFoodResponse>>
    {
        public override void Configure()
        {
            Get("/logged-food-by-date");
        }

        public override async Task HandleAsync(LoggedFoodByDateRequest req, CancellationToken ct)
        {
            var FoodResponse = await profileService.GetLoggedFoodByDateAsync(req, ct).ConfigureAwait(false);
            await SendAsync(FoodResponse, cancellation: ct).ConfigureAwait(false);
        }
    }
}
