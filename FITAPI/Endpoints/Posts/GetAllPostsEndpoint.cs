using FastEndpoints;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class GetAllPostsEndpoint(IPostsService postsService) : EndpointWithoutRequest<IReadOnlyCollection<GetPostsResponse>>
{
    public override void Configure()
    {
        Get("/posts");
    }
    //here I need to exclude the posts from the active user so he can't comment and like his own posts    
    public override async Task HandleAsync(CancellationToken ct)
    {
        await SendAsync(await postsService.GetPostsAsync(), cancellation: ct).ConfigureAwait(false);
    }
}