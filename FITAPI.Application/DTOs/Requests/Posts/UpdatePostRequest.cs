namespace FITAPI.Application.DTOs.Requests.Posts;

public record UpdatePostRequest(
    long Id,
    string? Content,
    string? Image);
