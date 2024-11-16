namespace FITAPI.Application.DTOs.Requests.Posts;

public record CreatePostRequest(
    string Email,
    string Content,
    string? Image);
