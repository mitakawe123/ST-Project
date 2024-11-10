namespace FITAPI.Application.DTOs.Responses;

public record RegisterUserResponse(
    string? Message,
    string? Token,
    bool Success);