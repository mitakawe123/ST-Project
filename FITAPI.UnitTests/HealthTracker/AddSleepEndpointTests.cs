using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker;

public class AddSleepEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCallAddSleepAsyncAndReturnSuccessMessage()
    {
        var healthTrackerService = A.Fake<IHealthTrackerService>();
        var ep = Factory.Create<AddSleepEndpoint>(healthTrackerService);

        var addSleepRequest = new AddSleepRequest("user@example.com", 1, 8.5);

        await ep.HandleAsync(addSleepRequest, CancellationToken.None);

        A.CallTo(() => healthTrackerService.AddSleepAsync(addSleepRequest, A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed);
        Assert.Equal("Successfully added sleep", ep.Response); 
    }
}