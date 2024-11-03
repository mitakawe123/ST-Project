using FastEndpoints;
using FITAPI.Application.Services.WgerService;
using FITAPI.Domain.DTOs;

namespace FITAPI.Endpoints;

public class GetExercisesCategories(IWgerService wgerService) : EndpointWithoutRequest<IReadOnlyCollection<ExerciseCategoryDto>>
{
    public override void Configure()
    {
        Get("/exercises/categories");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercisesCategories = await wgerService.GetExerciseCategoriesAsync();
        await SendAsync(exercisesCategories, cancellation: ct).ConfigureAwait(false);
    }
}