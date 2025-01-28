using Microsoft.AspNetCore.Mvc;


namespace FITAPI.Application.DTOs.Requests.Workouts;

public record MyWorkoutGoalsRequest([FromQuery] string Email);

