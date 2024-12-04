using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record LoggedFluidsRequest([FromQuery] string Email);