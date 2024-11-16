using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints.Posts;

public class GetMyPostsEndpoint(IPostsService postsService) : Endpoint<GetMyPostsRequest, IReadOnlyCollection<GetMyPostsResponse>>
{
    public override void Configure()
    {
        Get("/my-posts");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(GetMyPostsRequest req, CancellationToken ct)
    {
        await SendAsync(await postsService.GetMyPostsAsync(req), cancellation: ct).ConfigureAwait(false);
    }
}