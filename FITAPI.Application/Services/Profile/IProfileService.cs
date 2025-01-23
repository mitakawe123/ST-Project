using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Profile;
using FITAPI.Application.DTOs.Responses.Workouts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.Services.Profile
{
    internal interface IProfileService
    {
        Task<IReadOnlyCollection<GetFoodResponse>> GetLoggedFoodAsync(GetFoodRequest request, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<GetFluidsResponse>> GetLoggedFluidsAsync(GetFluidsRequest request, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<GetWorkoutResponse>> GetMyWorkoutsAsync(GetWorkoutRequest request, CancellationToken cancellationToken);
    }
}
