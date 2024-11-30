using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Responses.Posts;

public record GetPostsResponse(
    long Id,
    string Content,
    string? AvatarImg,
    string? Image,
    DateTime CreatedAt,
    long Likes,
    ICollection<CommentsDto> Comments);