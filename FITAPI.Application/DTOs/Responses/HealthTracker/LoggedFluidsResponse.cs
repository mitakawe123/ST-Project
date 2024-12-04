namespace FITAPI.Application.DTOs.Responses.HealthTracker;

public record LoggedFluidsResponse(
    DateTime LoggedAt,
    ICollection<Fluid> Fluids);
    
public record Fluid(
    long Id,
    double Amount,
    int FluidTypeId);