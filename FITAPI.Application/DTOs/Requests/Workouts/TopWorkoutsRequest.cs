using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Workouts;

public record TopWorkoutsRequest([FromQuery] string Email);