using System.Text;
using System.Text.Json;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Domain.Configurations;
using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.HealthTracker;

public class HealthTrackerService(
    HttpClient httpClient, 
    IConfiguration configuration, 
    FitDbContext context,
    UserManager<MyUser> userManager,
    ILogger<HealthTrackerService> logger) : IHealthTrackerService
{
    private readonly NutritionixSettings _nutritionixSettings = configuration.GetSection(nameof(NutritionixSettings)).Get<NutritionixSettings>()
        ?? throw new NullReferenceException("NutritionixSettings not found");
    
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<FoodSearchResponse> GetFoodsAsync(FoodSearchRequest request, CancellationToken cancellationToken)
    {
        try
        {
            string query = request.Query;
        
            if (string.IsNullOrWhiteSpace(query))
                return new FoodSearchResponse();

            var uri = new Uri($"{AppConstants.Nutritionix.Url}/natural/nutrients");

            var requestBody = new { query = query };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, uri)
            {
                Content = content
            };

            httpRequest.Headers.Add("x-app-id", _nutritionixSettings.XAppId);
            httpRequest.Headers.Add("x-app-key", _nutritionixSettings.XAppKey);

            var response = await httpClient.SendAsync(httpRequest, cancellationToken);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync(cancellationToken);
            var foodSearchResponse = JsonSerializer.Deserialize<FoodSearchResponse>(jsonResponse, _jsonSerializerOptions);

            return foodSearchResponse ?? new FoodSearchResponse();
        }
        catch (HttpRequestException ex)
        {
            logger.LogError("Request error: {Message}", ex.Message);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError("Error fetching foods from Nutritionix: {Message}", ex.Message);
            throw;
        }
    }

    public async Task SaveFoodsAsync(SaveFoodLogRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NullReferenceException("User does not exist");

        context.Foods.Add(new Foods
        {
            UserId = user.Id,
            UserFoods = request.Foods
        });
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<LoggedFoodResponse>> GetLoggedFoodAsync(LoggedFoodRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NullReferenceException("User does not exist");

        var foodsGroupedByDate = await context.Foods
            .AsNoTracking()
            .Where(x => x.UserId == user.Id)
            .GroupBy(x => x.LoggedAt.Date)
            .ToListAsync(cancellationToken);

        return foodsGroupedByDate
            .Select(x => new LoggedFoodResponse(
                x.Key,
                x.SelectMany(foods => foods.UserFoods).ToList()))
            .ToList();
    }

    public async Task AddFluidsAsync(AddFluidsRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NullReferenceException("User does not exist");

        context.Add(new Fluids
        {
            UserId = user.Id,
            FluidTypeId = request.FluidTypeId,
            Amount = request.Amount,
        });
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<LoggedFluidsResponse>> GetLoggedFluidsAsync(LoggedFluidsRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NullReferenceException("User does not exist");
        
        var fluidsGroupByDate = await context.Fluids
            .AsNoTracking() 
            .Where(x => x.UserId == user.Id)
            .GroupBy(x => x.LoggedAt.Date)
            .ToListAsync(cancellationToken);
        
        return fluidsGroupByDate
            .Select(x => new LoggedFluidsResponse(
                x.Key,
                x.Select(f => new Fluid(f.Id, f.Amount, f.FluidTypeId)).ToList()))
            .ToList();
    }
    
    public async Task AddSleepAsync(AddSleepRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new NullReferenceException("User does not exist");
    
        context.Add(new Sleep
        {
            UserId = user.Id,
            SleepTypeId = request.SleepTypeId,
            Hours= request.Hours,
        });
        await context.SaveChangesAsync(cancellationToken);
    }
    
    public async Task<IReadOnlyCollection<LoggedSleepResponse>> GetLoggedSleepAsync(LoggedSleepRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new NullReferenceException("User does not exist");
        
        var sleepGroupByDate = await context.Sleep
            .AsNoTracking() 
            .Where(x => x.UserId == user.Id)
            .GroupBy(x => x.LoggedAt.Date)
            .ToListAsync(cancellationToken);
        
        return sleepGroupByDate
            .Select(x => new LoggedSleepResponse(
                x.Key,
                x.Select(f => new SleepData(f.Id, f.Hours, f.SleepTypeId)).ToList()))
            .ToList();
    }
}