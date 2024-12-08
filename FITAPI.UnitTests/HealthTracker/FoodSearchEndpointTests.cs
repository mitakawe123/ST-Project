using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.DTOs.Responses.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker;

public class FoodSearchEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnFoodSearchResponseSuccessfully()
    {
        var healthTrackerService = A.Fake<IHealthTrackerService>();
        var ep = Factory.Create<FoodSearchEndpoint>(healthTrackerService);

        var foodSearchRequest = new FoodSearchRequest("apple");

        var mockedFoodSearchResponse = new FoodSearchResponse
        {
            Foods =
            [
                new FoodDto
                {
                    FoodName = "Apple",
                    BrandName = "Generic",
                    ServingQty = 1,
                    ServingWeightGrams = 150,
                    NfCalories = 52,
                    NfTotalFat = 0.2,
                    NfSaturatedFat = 0.1,
                    NfCholesterol = 0,
                    Sodium = 1,
                    TotalCarbohydrate = 14,
                    DietaryFiber = 2.4,
                    Sugars = 10,
                    Protein = 0.3,
                    Potassium = 107,
                    Photo = new FoodSearchPhotoResponse
                    {
                        Thumb = "thumb-url",
                        Highres = "highres-url"
                    }
                }
            ]
        };

        A.CallTo(() => healthTrackerService.GetFoodsAsync(foodSearchRequest, A<CancellationToken>.Ignored))
            .Returns(Task.FromResult(mockedFoodSearchResponse));

        await ep.HandleAsync(foodSearchRequest, CancellationToken.None);

        A.CallTo(() => healthTrackerService.GetFoodsAsync(foodSearchRequest, A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed);

        var response = ep.Response;
        Assert.NotNull(response);
        Assert.Single(response.Foods);
        Assert.Equal("Apple", response.Foods[0].FoodName);
        Assert.Equal("Generic", response.Foods[0].BrandName);
        Assert.Equal(1, response.Foods[0].ServingQty);
        Assert.Equal(150, response.Foods[0].ServingWeightGrams);
        Assert.Equal(52, response.Foods[0].NfCalories);
        Assert.Equal("thumb-url", response.Foods[0].Photo.Thumb);
    }
}