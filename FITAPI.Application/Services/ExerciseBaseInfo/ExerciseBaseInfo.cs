﻿using System.Text.Json;
using FITAPI.Application.Constants;
using FITAPI.Domain.DTOs;
using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.ExerciseBaseInfo;

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
            var response = await httpClient.GetAsync($"{AppConstants.WgerConstants.Url}/exercisebaseinfo");
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