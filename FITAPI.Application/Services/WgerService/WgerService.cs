using System.Text.Json;
using FITAPI.Application.Constants;
using FITAPI.Domain.DTOs;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.WgerService;

public class WgerService(HttpClient httpClient, ILogger<WgerService> logger) : IWgerService
{
    private readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<ExerciseResponseDto> GetExercisesAsync()
    {
        try
        {
            var response = await httpClient.GetAsync($"{AppConstants.WgerConstants.Url}/exercise");
            response.EnsureSuccessStatusCode();
            
            var jsonResponse = await response.Content.ReadAsStringAsync();

            var exerciseApiResponse = JsonSerializer.Deserialize<ExerciseResponseDto>(jsonResponse, JsonSerializerOptions);

            return exerciseApiResponse ?? new ExerciseResponseDto();
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Request error: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching exercises from Wger");
            throw;
        }
    }
}