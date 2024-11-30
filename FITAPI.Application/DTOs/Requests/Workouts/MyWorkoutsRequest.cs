using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Workouts;

public record MyWorkoutsRequest([FromQuery] string Email);