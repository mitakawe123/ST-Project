using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints.Comments;

public class UpdateCommentEndpoint(ICommentsService commentsService) : Endpoint<UpdateCommentRequest>
{
    public override void Configure()
    {
        Patch("/comment");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(UpdateCommentRequest req, CancellationToken ct)
    {
        await commentsService.UpdateCommentAsync(req);
        await SendAsync("Successfully updated comment", cancellation: ct).ConfigureAwait(false);
    }
}