using FITAPI.Domain.DTOs;
using FITAPI.Domain.Models;

namespace FITAPI.Application.DTOs.Responses.Posts;

public record GetMyPostsResponse(
    long Id,
    string Content,
    string? AvatarImg,
    string? Image,
    DateTime CreatedAt,
    long Likes,
    ICollection<CommentsDto> Comments);