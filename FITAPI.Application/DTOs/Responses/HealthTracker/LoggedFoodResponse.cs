using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Responses.HealthTracker;

public record LoggedFoodResponse(
    DateTime LoggedAt,
    ICollection<FoodDto> Foods);

public record LoggedFoodsDto(
    long Id,
    DateTime LoggedAt,
    ICollection<FoodDto> UserFoods); 