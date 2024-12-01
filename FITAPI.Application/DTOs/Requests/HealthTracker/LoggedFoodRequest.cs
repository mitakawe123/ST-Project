using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record LoggedFoodRequest([FromQuery] string Email);