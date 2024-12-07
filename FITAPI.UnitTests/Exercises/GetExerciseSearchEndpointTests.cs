using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Exercises;
using FITAPI.Application.Services.Exercises.ExerciseSearch;
using FITAPI.Endpoints.Exercises;
using FITAPI.Domain.DTOs;

namespace FITAPI.UnitTests.Exercises;

public class GetExerciseSearchEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnExerciseNamesSuccessfully()
    {
        var exerciseSearchService = A.Fake<IExerciseSearch>();
        var ep = Factory.Create<GetExerciseSearchEndpoint>(exerciseSearchService);

        var exerciseSearchRequest = new ExerciseSearchRequest("push");

        var mockedExercises = new ExerciseSearchDto
        {
            Suggestions =
            [
                new ExercisesDto("Push-up",
                    new ExerciseDataDto(1, "Push-up", "Strength", null)
                        { BaseId = 101, ImageThumbnail = "thumb1.jpg" }),
                new ExercisesDto("Push Press",
                    new ExerciseDataDto(2, "Push Press", "Strength", "image2.jpg")
                        { BaseId = 102, ImageThumbnail = "thumb2.jpg" }),
                new ExercisesDto("Push-ups",
                    new ExerciseDataDto(3, "Push-ups", "Strength", "image3.jpg")
                        { BaseId = 103, ImageThumbnail = "thumb3.jpg" })
            ]
        };

        A.CallTo(() => exerciseSearchService.GetExerciseSearchAsync("push", A<CancellationToken>.Ignored))
            .Returns(Task.FromResult(mockedExercises));

        await ep.HandleAsync(exerciseSearchRequest, CancellationToken.None);

        A.CallTo(() => exerciseSearchService.GetExerciseSearchAsync("push", A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed);

        var expectedResponse = new List<string> { "Push-up", "Push Press", "Push-ups" };
        Assert.Equal(expectedResponse, ep.Response);
    }
}