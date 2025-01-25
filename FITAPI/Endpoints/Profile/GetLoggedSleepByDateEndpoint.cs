using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.Profile;

namespace FITAPI.Endpoints.Profile
{
    public class GetLoggedSleepByDateEndpoint(IProfileService profileService) : Endpoint<LoggedSleepByDateRequest, IReadOnlyCollection<LoggedSleepResponse>>
    {
        public override void Configure()
        {
            Get("/logged-sleep-by-date");
        }

        public override async Task HandleAsync(LoggedSleepByDateRequest req, CancellationToken ct)
        {
            var sleepResponse = await profileService.GetLoggedSleepByDateAsync(req, ct).ConfigureAwait(false);
            await SendAsync(sleepResponse, cancellation: ct).ConfigureAwait(false);
        }
    }
}