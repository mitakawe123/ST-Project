using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker;

public class GetLoggedSleepEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnLoggedSleepSuccessfully()
    {
        var healthTrackerService = A.Fake<IHealthTrackerService>();
        var ep = Factory.Create<GetLoggedSleepEndpoint>(healthTrackerService);

        var loggedSleepRequest = new LoggedSleepRequest("test@example.com");

        var mockedLoggedSleepResponse = new List<LoggedSleepResponse>
        {
            new(DateTime.UtcNow,
                new List<SleepData>
                {
                    new(1, 7.5, 1)
                }
            )
        }.AsReadOnly(); 

        A.CallTo(() => healthTrackerService.GetLoggedSleepAsync(loggedSleepRequest, A<CancellationToken>.Ignored))
            .Returns(Task.FromResult<IReadOnlyCollection<LoggedSleepResponse>>(mockedLoggedSleepResponse));

        await ep.HandleAsync(loggedSleepRequest, CancellationToken.None);

        A.CallTo(() => healthTrackerService.GetLoggedSleepAsync(loggedSleepRequest, A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed); 

        var response = ep.Response;
        Assert.NotNull(response);
        Assert.Single(response); 
        Assert.Equal("test@example.com", loggedSleepRequest.Email);
        Assert.Single(response.ElementAt(0).Sleep);
        Assert.Equal(7.5, response.ElementAt(0).Sleep.ElementAt(0).Hours);
        Assert.Equal(1, response.ElementAt(0).Sleep.ElementAt(0).SleepTypeId);
    }
}