using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker;

public class AddFluidsEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCallAddFluidsAsyncAndReturnSuccessMessage()
    {
        var healthTrackerService = A.Fake<IHealthTrackerService>();
        var ep = Factory.Create<AddFluidsEndpoint>(healthTrackerService);

        var addFluidsRequest = new AddFluidsRequest("user@example.com",1,500);

        await ep.HandleAsync(addFluidsRequest, CancellationToken.None);

        A.CallTo(() => healthTrackerService.AddFluidsAsync(addFluidsRequest, A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed); 
        Assert.Equal("Successfully added fluids", ep.Response); 
    }
}