using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;

namespace FITAPI.Application.Services.HealthTracker;

public interface IHealthTrackerService
{
    Task<FoodSearchResponse> GetFoodsAsync(FoodSearchRequest request, CancellationToken cancellationToken);
    
    Task SaveFoodsAsync(SaveFoodLogRequest request, CancellationToken cancellationToken);
    
    Task<IReadOnlyCollection<LoggedFoodResponse>> GetLoggedFoodAsync(LoggedFoodRequest request, CancellationToken cancellationToken);
    
    Task AddFluidsAsync(AddFluidsRequest request, CancellationToken cancellationToken);
    
    Task<IReadOnlyCollection<LoggedFluidsResponse>> GetLoggedFluidsAsync(LoggedFluidsRequest request, CancellationToken cancellationToken);

    Task AddSleepAsync(AddSleepRequest request, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<LoggedSleepResponse>> GetLoggedSleepAsync(LoggedSleepRequest request, CancellationToken cancellationToken);
}