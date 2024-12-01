using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record FoodSearchRequest([FromQuery] string Query);