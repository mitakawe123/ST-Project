using FastEndpoints;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class LikePostEndpoint(IPostsService postsService) : Endpoint<LikePostRequest>
{
    public override void Configure()
    {
        Patch("/like-post");
    }

    public override async Task HandleAsync(LikePostRequest req, CancellationToken ct)
    {
        await postsService.LikePostAsync(req);
        await SendAsync($"Liked post: {req.PostId}", cancellation: ct);
    }
}