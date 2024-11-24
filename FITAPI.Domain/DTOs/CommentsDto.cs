namespace FITAPI.Domain.DTOs;

public record CommentsDto(
    long Id,
    string Content,
    DateTime CreatedAt,
    string? Username,
    string? AvatarImg);