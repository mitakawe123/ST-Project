namespace FITAPI.Application.DTOs.Responses;

public record RegisterUserResponse(
    string? Message,
    string? AccessToken);