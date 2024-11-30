using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;

namespace FITAPI.Application.Services.Workouts;

public interface IWorkoutService
{
    Task CreateWorkoutAsync(CreateWorkoutRequest request, CancellationToken cancellationToken);
    Task<IReadOnlyCollection<MyWorkoutsResponse>> GetMyWorkoutsAsync(MyWorkoutsRequest request, CancellationToken cancellationToken);
    Task DeleteMyWorkoutAsync(DeleteMyWorkoutRequest request, CancellationToken cancellationToken);
    Task<IReadOnlyCollection<TopWorkoutsResponse>> GetTopWorkoutsAsync(TopWorkoutsRequest request, CancellationToken cancellationToken);
}