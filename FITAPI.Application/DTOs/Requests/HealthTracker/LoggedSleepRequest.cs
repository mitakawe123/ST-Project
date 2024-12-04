using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record LoggedSleepRequest([FromQuery] string Email);