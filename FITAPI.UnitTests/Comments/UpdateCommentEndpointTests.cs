using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;
using FITAPI.Endpoints.Comments;

namespace FITAPI.UnitTests.Comments;

public class UpdateCommentEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldUpdateCommentSuccessfully()
    {
        var commentsService = A.Fake<ICommentsService>();
        var ep = Factory.Create<UpdateCommentEndpoint>(commentsService);

        var updateCommentRequest = new UpdateCommentRequest(1, "Updated comment content");

        A.CallTo(() => commentsService.UpdateCommentAsync(A<UpdateCommentRequest>.Ignored))
            .Returns(Task.CompletedTask);

        await ep.HandleAsync(updateCommentRequest, default);

        A.CallTo(() => commentsService.UpdateCommentAsync(A<UpdateCommentRequest>.Ignored)).MustHaveHappenedOnceExactly();
        Assert.False(ep.ValidationFailed); 
        Assert.Equal("Successfully updated comment", ep.Response); 
    }
}