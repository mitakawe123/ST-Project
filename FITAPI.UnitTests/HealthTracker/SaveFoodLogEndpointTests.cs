using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.HealthTracker;
using FITAPI.Application.Services.HealthTracker;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.HealthTracker;

namespace FITAPI.UnitTests.HealthTracker
{
    public class SaveFoodLogEndpointTests
    {
        [Fact]
        public async Task HandleAsync_ShouldSaveFoodLogSuccessfully()
        {
            var healthTrackerService = A.Fake<IHealthTrackerService>();
            var endpoint = Factory.Create<SaveFoodLogEndpoint>(healthTrackerService);

            var saveFoodLogRequest = new SaveFoodLogRequest(
                Email: "test@example.com",
                Foods: new List<FoodDto>
                {
                    new()
                    {
                        FoodName = "Banana",
                        BrandName = "Brand B",
                        ServingQty = 1,
                        ServingWeightGrams = 120,
                        NfCalories = 105,
                        NfTotalFat = 0.3,
                        NfSaturatedFat = 0.1,
                        NfCholesterol = 0,
                        Sodium = 1,
                        TotalCarbohydrate = 27,
                        DietaryFiber = 3.1,
                        Sugars = 14,
                        Protein = 1.3,
                        Potassium = 422,
                        Photo = new FoodSearchPhotoResponse
                        {
                            Thumb = "banana_thumb_url",
                            Highres = "banana_highres_url"
                        }
                    }
                }
            );

            await endpoint.HandleAsync(saveFoodLogRequest, CancellationToken.None);

            A.CallTo(() => healthTrackerService.SaveFoodsAsync(
                A<SaveFoodLogRequest>.That.Matches(req =>
                    req.Email == saveFoodLogRequest.Email &&
                    req.Foods.Count == saveFoodLogRequest.Foods.Count &&
                    req.Foods.ElementAt(0).FoodName == saveFoodLogRequest.Foods.ElementAt(0).FoodName
                ), A<CancellationToken>.Ignored))
                .MustHaveHappenedOnceExactly();

            Assert.False(endpoint.ValidationFailed);
            Assert.Equal("Successfully saved the food log", endpoint.Response);
        }
    }
}
