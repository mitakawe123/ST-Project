using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;

namespace FITAPI.Application.Services.HealthTracker;

public interface IHealthTrackerService
{
    Task<FoodSearchResponse> GetFoodsAsync(FoodSearchRequest request, CancellationToken cancellationToken);
    
    Task SaveFoodsAsync(SaveFoodLogRequest request, CancellationToken cancellationToken);
    
    Task<IReadOnlyCollection<LoggedFoodResponse>> GetLoggedFoodAsync(LoggedFoodRequest request, CancellationToken cancellationToken);
}