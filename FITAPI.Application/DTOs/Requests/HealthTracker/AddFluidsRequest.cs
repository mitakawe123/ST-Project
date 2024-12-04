namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record AddFluidsRequest(
    string Email,
    int FluidTypeId,
    double Amount);