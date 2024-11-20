using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;

namespace FITAPI.Application.Services.Posts;

public interface IPostsService
{
    Task<IReadOnlyCollection<GetPostsResponse>> GetPostsAsync();
    
    Task<IReadOnlyCollection<GetMyPostsResponse>> GetMyPostsAsync(GetMyPostsRequest request);

    Task CreatePostAsync(CreatePostRequest request);
    
    Task UpdatePostAsync(UpdatePostRequest request);
    
    Task DeletePostAsync(DeletePostRequest request);

    Task LikePostAsync(LikePostRequest request);
    
    Task CommentPostAsync(CommentPostRequest request);
}