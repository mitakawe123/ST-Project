using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record SaveFoodLogRequest(
    string Email,
    ICollection<FoodDto> Foods);