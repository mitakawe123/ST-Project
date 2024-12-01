using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class SaveFoodLogEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<SaveFoodLogRequest>
{
    public override void Configure()
    {
        Post("/food-log");
    }

    public override async Task HandleAsync(SaveFoodLogRequest req, CancellationToken ct)
    {
        await healthTrackerService.SaveFoodsAsync(req, ct);
        await SendAsync("Successfully saved the food log", cancellation: ct);
    }
}