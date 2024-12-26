using System.Text.Json;
using FITAPI.Domain.Constants;
using FITAPI.Domain.DTOs;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.Exercises.ExerciseBaseInfo;

public class ExerciseBaseInfo(HttpClient httpClient, ILogger<ExerciseBaseInfo> logger) : IExerciseBaseInfo
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<ExerciseDto> GetExercisesAsync()
    {
        try
        {
            var response = await httpClient.GetAsync($"{AppConstants.Wger.Url}/exercisebaseinfo");
            response.EnsureSuccessStatusCode();
            
            var jsonResponse = await response.Content.ReadAsStringAsync();

            var exerciseApiResponse = JsonSerializer.Deserialize<ExerciseDto>(jsonResponse, _jsonSerializerOptions);

            return exerciseApiResponse ?? new ExerciseDto();
        }
        catch (HttpRequestException ex)
        {
            logger.LogError("Request error: {Message}", ex.Message);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching exercises from Wger");
            throw;
        }
    }
}