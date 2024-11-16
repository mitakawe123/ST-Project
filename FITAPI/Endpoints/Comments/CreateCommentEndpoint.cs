using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;

namespace FITAPI.Endpoints.Comments;

public class CreateCommentEndpoint(ICommentsService commentsService) : Endpoint<CreateCommentRequest>
{
    public override void Configure()
    {
        Post("/comment");
    }

    public override async Task HandleAsync(CreateCommentRequest req, CancellationToken ct)
    {
        await commentsService.CreateCommentAsync(req);
        await SendAsync("Successfully created a comment", cancellation: ct).ConfigureAwait(false);
    }
}