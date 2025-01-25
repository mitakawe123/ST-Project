using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.DTOs.Responses.Workouts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.Services.Profile
{
    public interface IProfileService
    {
        Task<IReadOnlyCollection<LoggedFluidsResponse>> GetLoggedFluidsByDateAsync(LoggedFluidsByDateRequest request, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<LoggedSleepResponse>> GetLoggedSleepByDateAsync(LoggedSleepByDateRequest request, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<LoggedFoodResponse>> GetLoggedFoodByDateAsync(LoggedFoodByDateRequest request, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<MyWorkoutsResponse>> GetMyWorkoutsByDateAsync(MyWorkoutsByDateRequest request, CancellationToken cancellationToken);
    }
}
