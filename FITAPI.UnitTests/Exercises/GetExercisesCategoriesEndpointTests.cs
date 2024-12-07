using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.Services.Exercises.ExerciseCategory;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Exercises;

namespace FITAPI.UnitTests.Exercises;

public class GetExercisesCategoriesEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnExerciseCategoriesSuccessfully()
    {
        var exerciseCategoryService = A.Fake<IExerciseCategory>();
        var ep = Factory.Create<GetExercisesCategoriesEndpoint>(exerciseCategoryService);

        var mockedCategories = new List<ExerciseCategoryDto>
        {
            new() { Id = 1, Name = "Strength" },
            new() { Id = 2, Name = "Cardio" },
            new() { Id = 3, Name = "Flexibility" }
        };

        A.CallTo(() => exerciseCategoryService.GetExerciseCategoriesAsync())
            .Returns(Task.FromResult<IReadOnlyCollection<ExerciseCategoryDto>>(mockedCategories));

        await ep.HandleAsync(CancellationToken.None);

        A.CallTo(() => exerciseCategoryService.GetExerciseCategoriesAsync()).MustHaveHappenedOnceExactly();
        Assert.False(ep.ValidationFailed); 
        Assert.Equal(mockedCategories, ep.Response);  
    }
}