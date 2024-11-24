using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class GetAllPostsEndpoint(IPostsService postsService) : Endpoint<GetAllPostsRequest ,IReadOnlyCollection<GetPostsResponse>>
{
    public override void Configure()
    {
        Get("/posts");
    }

    public override async Task HandleAsync(GetAllPostsRequest req, CancellationToken ct)
    {
        await SendAsync(await postsService.GetPostsAsync(req), cancellation: ct).ConfigureAwait(false);
    }
}