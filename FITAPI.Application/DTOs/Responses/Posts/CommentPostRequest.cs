namespace FITAPI.Application.DTOs.Responses.Posts;

public record CommentPostRequest(long PostId, string Content, string Email);
