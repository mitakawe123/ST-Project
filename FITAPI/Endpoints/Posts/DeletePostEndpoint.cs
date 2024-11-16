using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;

namespace FITAPI.Endpoints.Posts;

public class DeletePostEndpoint(IPostsService postsService) : Endpoint<DeletePostRequest>
{
    public override void Configure()
    {
        Delete("/posts");
    }

    public override async Task HandleAsync(DeletePostRequest req, CancellationToken ct)
    {
        await postsService.DeletePostAsync(req);
        await SendAsync("Successfully deleted post", cancellation: ct).ConfigureAwait(false);
    }
}