using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Application.Services.Posts;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Posts;

namespace FITAPI.UnitTests.Posts;

public class GetMyPostsEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnMyPostsSuccessfully()
    {
        var postsService = A.Fake<IPostsService>();
        var getMyPostsRequest = new GetMyPostsRequest(Email: "user@example.com");

        var mockedPostsResponse = new List<GetMyPostsResponse>
        {
            new(
                Id: 1,
                Content: "My first post",
                AvatarImg: "avatar_url",
                Image: "image_url",
                CreatedAt: DateTime.UtcNow,
                Likes: 5,
                Comments: new List<CommentsDto>
                {
                    new(
                        Id: 1,
                        Content: "Nice post!",
                        CreatedAt: DateTime.UtcNow,
                        Username: "commenter1",
                        AvatarImg: "commenter_avatar_url"
                    )
                }
            )
        };

        A.CallTo(() => postsService.GetMyPostsAsync(getMyPostsRequest))
            .Returns(mockedPostsResponse);

        var endpoint = Factory.Create<GetMyPostsEndpoint>(postsService);

        await endpoint.HandleAsync(getMyPostsRequest, CancellationToken.None);

        Assert.Equal(mockedPostsResponse, endpoint.Response);
        Assert.False(endpoint.ValidationFailed); 

        A.CallTo(() => postsService.GetMyPostsAsync(
                A<GetMyPostsRequest>.That.Matches(req => req.Email == getMyPostsRequest.Email)
            ))
            .MustHaveHappenedOnceExactly();
    }
}