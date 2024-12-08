using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class DeletePostEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldDeletePostSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var endpoint = Factory.Create<DeletePostEndpoint>(postsService);

        var deletePostRequest = new DeletePostRequest(Id: 123);

        await endpoint.HandleAsync(deletePostRequest, CancellationToken.None);

        A.CallTo(() => postsService.DeletePostAsync(
                A<DeletePostRequest>.That.Matches(req => req.Id == deletePostRequest.Id)
            ))
            .MustHaveHappenedOnceExactly();

        Assert.Equal("Successfully deleted post", endpoint.Response); 
        Assert.False(endpoint.ValidationFailed);
    }
}