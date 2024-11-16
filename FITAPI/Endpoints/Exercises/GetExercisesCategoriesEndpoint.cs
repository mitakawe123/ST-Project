using FastEndpoints;
using FITAPI.Application.Services.ExerciseCategory;
using FITAPI.Domain.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints;

public class GetExercisesCategoriesEndpoint(IExerciseCategory exerciseCategory) : EndpointWithoutRequest<IReadOnlyCollection<ExerciseCategoryDto>>
{
    public override void Configure()
    {
        Get("/exercises/categories");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var exercisesCategories = await exerciseCategory.GetExerciseCategoriesAsync();
        await SendAsync(exercisesCategories, cancellation: ct).ConfigureAwait(false);
    }
}