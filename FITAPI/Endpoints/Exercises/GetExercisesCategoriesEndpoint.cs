using FastEndpoints;
using FITAPI.Application.Services.Exercises.ExerciseCategory;
using FITAPI.Domain.DTOs;

namespace FITAPI.Endpoints.Exercises;

public class GetExercisesCategoriesEndpoint(IExerciseCategory exerciseCategory) : EndpointWithoutRequest<IReadOnlyCollection<ExerciseCategoryDto>>
{
    public override void Configure()
    {
        Get("/exercises/categories");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercisesCategories = await exerciseCategory.GetExerciseCategoriesAsync();
        await SendAsync(exercisesCategories, cancellation: ct).ConfigureAwait(false);
    }
}