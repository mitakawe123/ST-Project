namespace FITAPI.Application.DTOs.Responses.HealthTracker;

public record LoggedSleepResponse(
    DateTime LoggedAt,
    ICollection<SleepData> Sleep);
    
public record SleepData(
    long Id,
    double Hours,
    int SleepTypeId);