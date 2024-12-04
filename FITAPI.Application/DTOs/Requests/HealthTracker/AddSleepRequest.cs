namespace FITAPI.Application.DTOs.Requests.HealthTracker;

public record AddSleepRequest(
    string Email,
    int SleepTypeId,
    double Hours);