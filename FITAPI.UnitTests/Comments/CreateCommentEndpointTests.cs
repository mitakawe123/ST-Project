using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;
using FITAPI.Endpoints.Comments;

namespace FITAPI.UnitTests.Comments;

public class CreateCommentEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCreateCommentSuccessfully()
    {
        var commentsService = A.Fake<ICommentsService>();
        var ep = Factory.Create<CreateCommentEndpoint>(commentsService);

        var createCommentRequest = new CreateCommentRequest(
            "test@gmail.com",
            1,
            "test");

        A.CallTo(() => commentsService.CreateCommentAsync(A<CreateCommentRequest>.Ignored))
            .Returns(Task.CompletedTask);

        await ep.HandleAsync(createCommentRequest, default);

        A.CallTo(() => commentsService.CreateCommentAsync(A<CreateCommentRequest>.Ignored)).MustHaveHappenedOnceExactly();
        Assert.False(ep.ValidationFailed);
        Assert.Equal("Successfully created a comment", ep.Response);
    }
}