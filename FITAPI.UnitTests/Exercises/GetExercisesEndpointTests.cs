using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.Services.Exercises.ExerciseBaseInfo;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Exercises;

namespace FITAPI.UnitTests.Exercises;

public class GetExercisesEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnExerciseDataSuccessfully()
    {
        var exerciseBaseInfoService = A.Fake<IExerciseBaseInfo>();
        var ep = Factory.Create<GetExercisesEndpoint>(exerciseBaseInfoService);

        var mockedExercises = new ExerciseDto
        {
            Count = 3,
            Next = null,
            Previous = null,
            Results = new List<Exercise>
            {
                new()
                {
                    Id = 1,
                    Uuid = Guid.NewGuid(),
                    Name = "Push-up",
                    ExerciseBase = 1,
                    Description = "A basic push-up exercise",
                    Created = DateTime.UtcNow,
                    Category = new BaseDto(1,"Strength"),
                    Muscles = new List<Muscles>
                    {
                        new() { Id = 1, Name = "Chest", NameEn = "Chest", IsFront = true }
                    },
                    Equipment = new List<BaseDto> { new( 1, "Bodyweight") },
                    Language = 1,
                    License = new License { Id = 1, FullName = "Public Domain", ShortName = "PD", Url = "http://license-url.com" },
                    Variations = new List<int> { 1, 2 },
                    AuthorHistory = new List<string> { "John Doe" }
                },
                new()
                {
                    Id = 2,
                    Uuid = Guid.NewGuid(),
                    Name = "Push Press",
                    ExerciseBase = 1,
                    Description = "A press exercise for shoulders",
                    Created = DateTime.UtcNow,
                    Category = new BaseDto(1, "Strength"),
                    Muscles = new List<Muscles>
                    {
                        new() { Id = 2, Name = "Shoulders", NameEn = "Shoulders", IsFront = true }
                    },
                    Equipment = new List<BaseDto> { new BaseDto( 2, "Barbell") },
                    Language = 1,
                    License = new License { Id = 2, FullName = "Creative Commons", ShortName = "CC", Url = "http://license-url.com" },
                    Variations = new List<int> { 3, 4 },
                    AuthorHistory = new List<string> { "Jane Doe" }
                }
            }
        };

        A.CallTo(() => exerciseBaseInfoService.GetExercisesAsync())
            .Returns(Task.FromResult(mockedExercises));

        await ep.HandleAsync(CancellationToken.None);

        A.CallTo(() => exerciseBaseInfoService.GetExercisesAsync())
            .MustHaveHappenedOnceExactly();

        Assert.False(ep.ValidationFailed);

        Assert.Equal(mockedExercises.Count, ep.Response.Count);
        Assert.Equal(mockedExercises.Results.Count, ep.Response.Results.Count);

        var firstExercise = ep.Response.Results.ElementAt(0);
        Assert.Equal("Push-up", firstExercise.Name);
        Assert.Equal("Strength", firstExercise.Category.Name);
        Assert.Contains("Chest", firstExercise.Muscles.ElementAt(0).Name);
    }
}