using FITAPI.Application.DTOs.Requests.Workouts;

namespace FITAPI.Application.Services.Workouts;

public interface IWorkoutService
{
    Task CreateWorkoutAsync(CreateWorkoutRequest request, CancellationToken cancellationToken);
}