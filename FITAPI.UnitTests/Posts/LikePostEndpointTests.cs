using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class LikePostEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldLikePostSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var likePostRequest = new LikePostRequest(PostId: 123);

        A.CallTo(() => postsService.LikePostAsync(likePostRequest))
            .DoesNothing();

        var endpoint = Factory.Create<LikePostEndpoint>(postsService);

        await endpoint.HandleAsync(likePostRequest, CancellationToken.None);

        Assert.Equal($"Liked post: {likePostRequest.PostId}", endpoint.Response);
        Assert.False(endpoint.ValidationFailed);

        A.CallTo(() => postsService.LikePostAsync(
                A<LikePostRequest>.That.Matches(req => req.PostId == likePostRequest.PostId)
            ))
            .MustHaveHappenedOnceExactly();
    }
}