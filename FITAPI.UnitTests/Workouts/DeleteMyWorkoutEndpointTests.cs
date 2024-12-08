using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;
using FITAPI.Endpoints.Workouts;

namespace FITAPI.UnitTests.Workouts;

public class DeleteMyWorkoutEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldDeleteMyWorkoutSuccessfully()
    {
        var workoutService = A.Fake<IWorkoutService>();
        
        var deleteMyWorkoutRequest = new DeleteMyWorkoutRequest(Id: 123);

        A.CallTo(() => workoutService.DeleteMyWorkoutAsync(deleteMyWorkoutRequest, A<CancellationToken>.Ignored))
            .DoesNothing();

        var endpoint = Factory.Create<DeleteMyWorkoutEndpoint>(workoutService);

        await endpoint.HandleAsync(deleteMyWorkoutRequest, CancellationToken.None);

        Assert.Equal("Deleted my workout", endpoint.Response);
        Assert.False(endpoint.ValidationFailed); 

        A.CallTo(() => workoutService.DeleteMyWorkoutAsync(
                A<DeleteMyWorkoutRequest>.That.Matches(req => req.Id == deleteMyWorkoutRequest.Id),
                A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();
    }
}