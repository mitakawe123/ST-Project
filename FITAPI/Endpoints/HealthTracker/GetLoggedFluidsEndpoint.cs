using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class GetLoggedFluidsEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<LoggedFluidsRequest, IReadOnlyCollection<LoggedFluidsResponse>>
{
    public override void Configure()
    {
        Get("/logged-fluids");
    }

    public override async Task HandleAsync(LoggedFluidsRequest req, CancellationToken ct)
    {
        var fluidsResponse = await healthTrackerService.GetLoggedFluidsAsync(req, ct).ConfigureAwait(false);
        await SendAsync(fluidsResponse, cancellation: ct).ConfigureAwait(false);
    }
}