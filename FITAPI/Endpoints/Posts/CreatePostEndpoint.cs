using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class CreatePostEndpoint(IPostsService postsService) : Endpoint<CreatePostRequest>
{
    public override void Configure()
    {
        Post("/post");
    }

    public override async Task HandleAsync(CreatePostRequest req, CancellationToken ct)
    {
        await postsService.CreatePostAsync(req);
        await SendAsync("Successfully created post", cancellation: ct).ConfigureAwait(false);
    }
}