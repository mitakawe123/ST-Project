using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Application.Services.Profile;

namespace FITAPI.Endpoints.Profile
{
    public class GetLoggedFluidsByDateEndpoint(IProfileService profileService) : Endpoint<LoggedFluidsByDateRequest, IReadOnlyCollection<LoggedFluidsResponse>>
    {
        public override void Configure()
        {
            Get("/logged-fluids-by-date");
        }

        public override async Task HandleAsync(LoggedFluidsByDateRequest req, CancellationToken ct)
        {
            var fluidsResponse = await profileService.GetLoggedFluidsByDateAsync(req, ct).ConfigureAwait(false);
            await SendAsync(fluidsResponse, cancellation: ct).ConfigureAwait(false);
        }
    }
}