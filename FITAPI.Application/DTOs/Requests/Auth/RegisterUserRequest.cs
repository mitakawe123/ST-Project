namespace FITAPI.Application.DTOs.Requests;

public record RegisterUserRequest(
    string UserName,
    string Email,
    string Password);