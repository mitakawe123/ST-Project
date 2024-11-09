using System.Text.Json;
using FITAPI.Application.Constants;
using FITAPI.Domain.DTOs;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.ExerciseCategory;

public class ExerciseCategory(HttpClient httpClient, ILogger<ExerciseCategory> logger) : IExerciseCategory
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<IReadOnlyCollection<ExerciseCategoryDto>> GetExerciseCategoriesAsync()
    {
        try
        {
            var response = await httpClient.GetAsync($"{AppConstants.WgerConstants.Url}/exercisecategory");
            response.EnsureSuccessStatusCode();
        
            var jsonResponse = await response.Content.ReadAsStringAsync();
        
            var exerciseCategoriesResponse = JsonSerializer.Deserialize<IReadOnlyCollection<ExerciseCategoryDto>>(jsonResponse, _jsonSerializerOptions);
        
            return exerciseCategoriesResponse ?? new List<ExerciseCategoryDto>();
        }
        catch (HttpRequestException ex)
        {
            logger.LogError("Request error: {Message}", ex.Message);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching exercises categories from Wger");
            throw;
        }
    }
}