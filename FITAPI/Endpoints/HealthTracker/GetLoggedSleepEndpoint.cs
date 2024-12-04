using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class GetLoggedSleepEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<LoggedSleepRequest, IReadOnlyCollection<LoggedSleepResponse>>
{
    public override void Configure()
    {
        Get("/logged-sleep");
    }

    public override async Task HandleAsync(LoggedSleepRequest req, CancellationToken ct)
    {
        var loggedSleepResponses= await healthTrackerService.GetLoggedSleepAsync(req, ct).ConfigureAwait(false);
        await SendAsync(loggedSleepResponses, cancellation: ct).ConfigureAwait(false);
    }
}