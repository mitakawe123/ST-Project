using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;

namespace FITAPI.Endpoints.HealthTracker;

public class FoodSearchEndpoint(IHealthTrackerService healthTrackerService) : Endpoint<FoodSearchRequest, FoodSearchResponse>
{
    public override void Configure()
    {
        Post("/food-search");
    }

    public override async Task HandleAsync(FoodSearchRequest req, CancellationToken ct)
    {
        var foods = await healthTrackerService.GetFoodsAsync(req, ct).ConfigureAwait(false);
        await SendAsync(foods, cancellation: ct).ConfigureAwait(false);
    }
}