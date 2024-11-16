using FITAPI.Application.DTOs.Responses.Posts;

namespace FITAPI.Application.Services.Posts;

public interface IPostsService
{
    Task<IReadOnlyCollection<GetPostsResponse>> GetPostsAsync();
}