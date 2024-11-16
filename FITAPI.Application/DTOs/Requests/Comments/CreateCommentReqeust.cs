namespace FITAPI.Application.DTOs.Requests.Comments;

public record CreateCommentRequest(string Email, long PostId, string Content);