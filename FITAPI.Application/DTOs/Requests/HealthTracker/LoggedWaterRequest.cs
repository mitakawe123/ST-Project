using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record LoggedWaterRequest([FromQuery] string Email);