using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Application.Services.Comments;
using FITAPI.Endpoints.Comments;

namespace FITAPI.UnitTests.Comments;

public class DeleteCommentEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldDeleteCommentSuccessfully()
    {
        var commentsService = A.Fake<ICommentsService>();
        var ep = Factory.Create<DeleteCommentEndpoint>(commentsService);

        var deleteCommentRequest = new DeleteCommentReqeust(1); 

        A.CallTo(() => commentsService.DeleteCommentAsync(A<DeleteCommentReqeust>.Ignored))
            .Returns(Task.CompletedTask);

        await ep.HandleAsync(deleteCommentRequest, default);

        A.CallTo(() => commentsService.DeleteCommentAsync(A<DeleteCommentReqeust>.Ignored)).MustHaveHappenedOnceExactly();
        Assert.False(ep.ValidationFailed);  
        Assert.Equal("Successfully deleted comment", ep.Response); 
    }
}