using FITAPI.Application.DTOs.Requests.Profile;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.DTOs.Responses.Profile;
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
    internal class ProfileService(
        UserManager<MyUser> userManager, 
        FitDbContext context
        ) : IProfileService
    {
        public async Task<IReadOnlyCollection<GetFluidsResponse>> GetLoggedFluidsAsync(GetFluidsRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyCollection<GetFoodResponse>> GetLoggedFoodAsync(GetFoodRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NullReferenceException("User does not exist");

            var foodsGroupedByDate = await context.Foods
                .AsNoTracking()
                .Where(x => x.UserId == user.Id)
                .GroupBy(x => x.LoggedAt.Date)
                .ToListAsync(cancellationToken);

            return foodsGroupedByDate
                .Select(x => new GetFoodResponse(
                    x.Key,
                    x.SelectMany(foods => foods.UserFoods).ToList()))
                .ToList();
        }

        public async Task<IReadOnlyCollection<GetWorkoutResponse>> GetMyWorkoutsAsync(GetWorkoutRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
