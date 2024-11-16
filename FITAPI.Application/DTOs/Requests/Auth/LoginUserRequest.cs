namespace FITAPI.Application.DTOs.Requests;

public record LoginUserRequest(
    string Email,
    string Password);