using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class UpdatePostEndpoint(IPostsService postsService) : Endpoint<UpdatePostRequest>
{
    public override void Configure()
    {
        Patch("/post");
    }

    public override async Task HandleAsync(UpdatePostRequest req, CancellationToken ct)
    {
        await postsService.UpdatePostAsync(req);
        await SendAsync("Successfully updated post", cancellation: ct).ConfigureAwait(false);
    }
}