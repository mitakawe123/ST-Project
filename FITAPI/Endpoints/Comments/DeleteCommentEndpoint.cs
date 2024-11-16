using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints.Comments;

public class DeleteCommentEndpoint(ICommentsService commentsService) : Endpoint<DeleteCommentReqeust>
{
    public override void Configure()
    {
        Delete("/comment");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(DeleteCommentReqeust req, CancellationToken ct)
    {
        await commentsService.DeleteCommentAsync(req);
        await SendAsync("Successfully deleted comment", cancellation: ct).ConfigureAwait(false);
    }
}