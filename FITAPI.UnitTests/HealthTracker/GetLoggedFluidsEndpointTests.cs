using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker
{
    public class GetLoggedFluidsEndpointTests
    {
        [Fact]
        public async Task HandleAsync_ShouldReturnLoggedFluidsSuccessfully()
        {
            var healthTrackerService = A.Fake<IHealthTrackerService>();
            var ep = Factory.Create<GetLoggedFluidsEndpoint>(healthTrackerService);

            var loggedFluidsRequest = new LoggedFluidsRequest("test@example.com");

            var mockedLoggedFluidsResponse = new List<LoggedFluidsResponse>
            {
                new( 
                    DateTime.UtcNow,
                    new List<Fluid>
                    {
                        new(1, 500, 2)
                    }
                )
            };

            A.CallTo(() => healthTrackerService.GetLoggedFluidsAsync(loggedFluidsRequest, A<CancellationToken>.Ignored))
                .Returns(Task.FromResult<IReadOnlyCollection<LoggedFluidsResponse>>(mockedLoggedFluidsResponse));
                                                                        
            await ep.HandleAsync(loggedFluidsRequest, CancellationToken.None);

            A.CallTo(() => healthTrackerService.GetLoggedFluidsAsync(loggedFluidsRequest, A<CancellationToken>.Ignored))
                .MustHaveHappenedOnceExactly();

            Assert.False(ep.ValidationFailed); 

            var response = ep.Response as List<LoggedFluidsResponse>;
            Assert.NotNull(response);
            Assert.Single(response); 
            Assert.Equal("test@example.com", loggedFluidsRequest.Email);
            Assert.Single(response[0].Fluids); 
            Assert.Equal(500, response[0].Fluids.ElementAt(0).Amount);
            Assert.Equal(2, response[0].Fluids.ElementAt(0).FluidTypeId);
        }
    }
}
