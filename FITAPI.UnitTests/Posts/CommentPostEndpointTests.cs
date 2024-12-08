using FastEndpoints;
using FakeItEasy;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class CommentPostEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCommentOnPostSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var endpoint = Factory.Create<CommentPostEndpoint>(postsService);

        var commentRequest = new CommentPostRequest(
            PostId: 1,
            Content: "This is a test comment.",
            Email: "test@example.com"
        );

        await endpoint.HandleAsync(commentRequest, CancellationToken.None);

        A.CallTo(() => postsService.CommentPostAsync(
                A<CommentPostRequest>.That.Matches(req =>
                    req.PostId == commentRequest.PostId &&
                    req.Content == commentRequest.Content &&
                    req.Email == commentRequest.Email
                )))
            .MustHaveHappenedOnceExactly();

        Assert.Equal($"Comment a post {commentRequest.PostId}", endpoint.Response);
        Assert.False(endpoint.ValidationFailed); 
    }
}