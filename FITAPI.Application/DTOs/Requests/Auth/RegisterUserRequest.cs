namespace FITAPI.Application.DTOs.Requests.Auth;

public record RegisterUserRequest(
    string UserName,
    string Email,
    string Password);