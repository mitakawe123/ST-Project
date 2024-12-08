using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class UpdatePostEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldUpdatePostSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();

        var updatePostRequest = new UpdatePostRequest(
            Id: 123,
            Content: "Updated Content",
            Image: "updated_image_url"
        );

        A.CallTo(() => postsService.UpdatePostAsync(updatePostRequest))
            .DoesNothing();

        var endpoint = Factory.Create<UpdatePostEndpoint>(postsService);

        await endpoint.HandleAsync(updatePostRequest, CancellationToken.None);

        Assert.Equal("Successfully updated post", endpoint.Response);
        Assert.False(endpoint.ValidationFailed); 

        A.CallTo(() => postsService.UpdatePostAsync(
                A<UpdatePostRequest>.That.Matches(req =>
                    req.Id == updatePostRequest.Id &&
                    req.Content == updatePostRequest.Content &&
                    req.Image == updatePostRequest.Image
                )
            ))
            .MustHaveHappenedOnceExactly();
    }
}