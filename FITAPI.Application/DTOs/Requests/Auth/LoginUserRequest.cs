namespace FITAPI.Application.DTOs.Requests.Auth;

public record LoginUserRequest(
    string Email,
    string Password);