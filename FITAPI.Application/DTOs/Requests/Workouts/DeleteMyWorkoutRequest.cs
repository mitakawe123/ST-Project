using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Workouts;

public record DeleteMyWorkoutRequest([FromRoute] long Id);