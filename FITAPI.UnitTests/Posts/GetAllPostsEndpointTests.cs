using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class GetAllPostsEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnPostsSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var getAllPostsRequest = new GetAllPostsRequest(Email: "test@example.com");
            
        var mockedPostsResponse = new List<GetPostsResponse>
        {
            new(
                Id: 1,
                Content: "Test Content",
                AvatarImg: "avatar_url",
                Image: "image_url",
                CreatedAt: DateTime.UtcNow,
                Likes: 10,
                Comments: new List<CommentsDto>
                {
                    new(1, "Nice post!", DateTime.UtcNow, "test", "base64/img")
                })
        };

        A.CallTo(() => postsService.GetPostsAsync(getAllPostsRequest))
            .Returns(mockedPostsResponse);

        var endpoint = Factory.Create<GetAllPostsEndpoint>(postsService);

        await endpoint.HandleAsync(getAllPostsRequest, CancellationToken.None);

        Assert.Equal(mockedPostsResponse, endpoint.Response);
        Assert.False(endpoint.ValidationFailed);

        A.CallTo(() => postsService.GetPostsAsync(
                A<GetAllPostsRequest>.That.Matches(req => req.Email == getAllPostsRequest.Email)
            ))
            .MustHaveHappenedOnceExactly();
    }
}