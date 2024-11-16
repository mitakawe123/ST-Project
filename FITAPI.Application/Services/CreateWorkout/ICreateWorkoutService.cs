using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.CreateWorkout;

public interface ICreateWorkoutService
{
    Task CreateWorkoutAsync(CreateWorkoutDto createWorkoutDto, CancellationToken cancellationToken);
}