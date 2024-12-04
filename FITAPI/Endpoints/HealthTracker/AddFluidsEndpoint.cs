using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class AddFluidsEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<AddFluidsRequest>
{
    public override void Configure()
    {
        Post("/add-fluids");
    }

    public override async Task HandleAsync(AddFluidsRequest req, CancellationToken ct)
    {
        await healthTrackerService.AddFluidsAsync(req, ct).ConfigureAwait(false);
        await SendAsync("Successfully added fluids", cancellation: ct).ConfigureAwait(false);
    }
}