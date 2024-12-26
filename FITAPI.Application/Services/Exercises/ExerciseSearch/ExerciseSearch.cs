using System.Text.Json;
using FITAPI.Domain.Constants;
using FITAPI.Domain.DTOs;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.Exercises.ExerciseSearch;

public class ExerciseSearch(HttpClient httpClient, ILogger<ExerciseSearch> logger) : IExerciseSearch
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<ExerciseSearchDto> GetExerciseSearchAsync(string term, CancellationToken cancellationToken)
    {
        try
        {
            if (string.IsNullOrEmpty(term))
                return new ExerciseSearchDto();
            
            var uri = new UriBuilder($"{AppConstants.Wger.Url}/exercise/search?language=en&term={term}");
            
            var response = await httpClient.GetAsync(uri.ToString(), cancellationToken);
            response.EnsureSuccessStatusCode();
        
            var jsonResponse = await response.Content.ReadAsStringAsync(cancellationToken);
        
            var exerciseCategoriesResponse = JsonSerializer.Deserialize<ExerciseSearchDto>(jsonResponse, _jsonSerializerOptions);
        
            return exerciseCategoriesResponse ?? new ExerciseSearchDto();
        }
        catch (HttpRequestException ex)
        {
            logger.LogError("Request error: {Message}", ex.Message);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching exercises search from Wger");
            throw;
        }
    }
}