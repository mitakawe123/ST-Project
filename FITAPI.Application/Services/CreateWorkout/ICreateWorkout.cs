using FITAPI.Domain.DTOs;

namespace FITAPI.Application.Services.CreateWorkout;

public interface ICreateWorkout
{
    Task CreateWorkoutAsync(CreateWorkoutDto createWorkoutDto, CancellationToken cancellationToken);
}