using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Domain.DTOs;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.Services.Profile
{
    public class ProfileService(FitDbContext context, UserManager<MyUser> userManager
) : IProfileService
    {
        public async Task<IReadOnlyCollection<LoggedFluidsResponse>> GetLoggedFluidsByDateAsync(LoggedFluidsByDateRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email)
                ?? throw new NullReferenceException("User does not exist");

            var date = request.Date.HasValue? DateTime.SpecifyKind(request.Date.Value.Date, DateTimeKind.Utc): DateTime.UtcNow.Date;

            var fluids = await context.Fluids
                .AsNoTracking()
                .Where(x => x.UserId == user.Id && x.LoggedAt.Date == date)
                .ToListAsync(cancellationToken);

            return new List<LoggedFluidsResponse>
            {
                new LoggedFluidsResponse(
                    date,
                    fluids.Select(f => new Fluid(f.Id, f.Amount, f.FluidTypeId)).ToList())
            };
        }

        public async Task<IReadOnlyCollection<LoggedSleepResponse>> GetLoggedSleepByDateAsync(LoggedSleepByDateRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email)
                ?? throw new NullReferenceException("User does not exist");

            var date = request.Date.HasValue ? DateTime.SpecifyKind(request.Date.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow.Date;

            var sleepRecords = await context.Sleep
                .AsNoTracking()
                .Where(x => x.UserId == user.Id && x.LoggedAt.Date == date)
                .ToListAsync(cancellationToken);

            return new List<LoggedSleepResponse>
        {
            new LoggedSleepResponse(
                date,
                sleepRecords.Select(f => new SleepData(f.Id, f.Hours, f.SleepTypeId)).ToList())
        };
        }

        public async Task<IReadOnlyCollection<LoggedFoodResponse>> GetLoggedFoodByDateAsync(LoggedFoodByDateRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email)
                ?? throw new NullReferenceException("User does not exist");

            var date = request.Date.HasValue ? DateTime.SpecifyKind(request.Date.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow.Date;

            var foodRecords = await context.Foods
                .AsNoTracking()
                .Where(x => x.UserId == user.Id && x.LoggedAt.Date == date)
                .ToListAsync(cancellationToken);

            return new List<LoggedFoodResponse>
        {
            new LoggedFoodResponse(
                date,
                foodRecords.SelectMany(foods => foods.UserFoods).ToList())
        };
        }

        public async Task<IReadOnlyCollection<MyWorkoutsResponse>> GetMyWorkoutsByDateAsync(MyWorkoutsByDateRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email)
                ?? throw new Exception($"User with email {request.Email} does not exist");

            var date = request.Date.HasValue ? DateTime.SpecifyKind(request.Date.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow.Date;


            return await context.Workouts
                .Where(x => x.UserId == user.Id && x.LoggedAt.Date == date)
                .Select(x => new MyWorkoutsResponse(x.Id, x.Name, x.Description, x.LoggedAt, x.Exercises ?? new List<WorkoutExercise>()))
                .ToListAsync(cancellationToken);
        }
    }
}
