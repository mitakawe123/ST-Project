using FastEndpoints;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class CommentPostEndpoint(IPostsService postsService) : Endpoint<CommentPostRequest>
{
    public override void Configure()
    {
        Patch("/posts/comment");
    }

    public override async Task HandleAsync(CommentPostRequest req, CancellationToken ct)
    {
        await postsService.CommentPostAsync(req);
        await SendAsync($"Comment a post {req.PostId}", cancellation: ct);
    }
}