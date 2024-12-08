using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker;

public class LoggedFoodEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnLoggedFoodSuccessfully()
    {
        var healthTrackerService = A.Fake<IHealthTrackerService>();
        var ep = Factory.Create<LoggedFoodEndpoint>(healthTrackerService);

        var loggedFoodRequest = new LoggedFoodRequest("test@example.com");

        var mockedLoggedFoodResponse = new List<LoggedFoodResponse>
        {
            new(
                DateTime.UtcNow,
                new List<FoodDto>
                {
                    new()
                    {
                        FoodName = "Apple",
                        BrandName = "Brand A",
                        ServingQty = 1,
                        ServingWeightGrams = 150,
                        NfCalories = 95,
                        NfTotalFat = 0.3,
                        NfSaturatedFat = 0.1,
                        NfCholesterol = 0,
                        Sodium = 1,
                        TotalCarbohydrate = 25,
                        DietaryFiber = 4.5,
                        Sugars = 19,
                        Protein = 0.5,
                        Potassium = 195,
                        Photo = new FoodSearchPhotoResponse
                        {
                            Thumb = "thumb_url",
                            Highres = "highres_url"
                        }
                    }
                }
            )
        }.AsReadOnly(); 

        A.CallTo(() => healthTrackerService.GetLoggedFoodAsync(loggedFoodRequest, A<CancellationToken>.Ignored))
            .Returns(Task.FromResult<IReadOnlyCollection<LoggedFoodResponse>>(mockedLoggedFoodResponse));

        await ep.HandleAsync(loggedFoodRequest, CancellationToken.None);

        A.CallTo(() => healthTrackerService.GetLoggedFoodAsync(loggedFoodRequest, A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed); 

        var response = ep.Response;
        Assert.NotNull(response);
        Assert.Single(response); 
        Assert.Equal("test@example.com", loggedFoodRequest.Email);
        Assert.Single(response.ElementAt(0).Foods); 
        Assert.Equal("Apple", response.ElementAt(0).Foods.ElementAt(0).FoodName);
        Assert.Equal(95, response.ElementAt(0).Foods.ElementAt(0).NfCalories);
        Assert.Equal("thumb_url", response.ElementAt(0).Foods.ElementAt(0).Photo.Thumb);
        Assert.Equal("highres_url", response.ElementAt(0).Foods.ElementAt(0).Photo.Highres);
    }
}