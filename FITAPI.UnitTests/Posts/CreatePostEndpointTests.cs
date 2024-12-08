using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class CreatePostEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCreatePostSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var endpoint = Factory.Create<CreatePostEndpoint>(postsService);

        var createPostRequest = new CreatePostRequest(
            Email: "test@example.com",
            Content: "This is a test post.",
            Image: "test_image_url"
        );

        await endpoint.HandleAsync(createPostRequest, CancellationToken.None);

        A.CallTo(() => postsService.CreatePostAsync(
                A<CreatePostRequest>.That.Matches(req =>
                    req.Email == createPostRequest.Email &&
                    req.Content == createPostRequest.Content &&
                    req.Image == createPostRequest.Image
                )))
            .MustHaveHappenedOnceExactly();

        Assert.Equal("Successfully created post", endpoint.Response); 
        Assert.False(endpoint.ValidationFailed); 
    }
}