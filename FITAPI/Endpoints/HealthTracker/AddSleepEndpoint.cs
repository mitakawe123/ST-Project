using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class AddSleepEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<AddSleepRequest>
{
    public override void Configure()
    {
        Post("/add-sleep");
    }

    public override async Task HandleAsync(AddSleepRequest req, CancellationToken ct)
    {
        await healthTrackerService.AddSleepAsync(req, ct).ConfigureAwait(false);
        await SendAsync("Successfully added sleep", cancellation: ct).ConfigureAwait(false);
    }
}