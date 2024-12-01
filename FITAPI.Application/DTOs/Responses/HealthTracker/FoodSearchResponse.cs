using System.Text.Json.Serialization;
using FITAPI.Domain.DTOs;

namespace FITAPI.Application.DTOs.Responses.HealthTracker;

public record FoodSearchResponse
{
    [JsonPropertyName("foods")]
    public List<FoodDto> Foods { get; init; } = [];
}

