namespace FITAPI.Application.DTOs.Responses.HealthTracker;

public record LoggedWaterResponse(
    DateTime LoggedAt,
    ICollection<long> WaterInMl);