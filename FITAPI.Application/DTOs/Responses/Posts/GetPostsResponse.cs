using FITAPI.Domain.Models;

namespace FITAPI.Application.DTOs.Responses.Posts;

public record GetPostsResponse(
    long Id,
    string Content,
    string? AvatarImg,
    string? Image,
    long Likes,
    ICollection<Comments> Comments);