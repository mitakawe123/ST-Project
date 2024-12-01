using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class LoggedFoodEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<LoggedFoodRequest, IReadOnlyCollection<LoggedFoodResponse>>
{
    public override void Configure()
    {
        Get("/logged-food");
    }

    public override async Task HandleAsync(LoggedFoodRequest req, CancellationToken ct)
    {
        var loggedFoodResponse = await healthTrackerService.GetLoggedFoodAsync(req, ct).ConfigureAwait(false);
        await SendAsync(loggedFoodResponse, cancellation: ct).ConfigureAwait(false);
    }
}