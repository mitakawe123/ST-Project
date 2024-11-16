using FastEndpoints;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints.Posts;

public class GetAllPosts(IPostsService postsService) : EndpointWithoutRequest<IReadOnlyCollection<GetPostsResponse>>
{
    public override void Configure()
    {
        Get("/all-posts");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await SendAsync(await postsService.GetPostsAsync(), cancellation: ct);
    }
}