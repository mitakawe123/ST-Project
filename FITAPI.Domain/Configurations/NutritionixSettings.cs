using System.Text.Json.Serialization;

namespace FITAPI.Domain.Configurations;

public class NutritionixSettings
{
    [JsonPropertyName("x-app-id")]
    public required string XAppId { get; init; }
    
    [JsonPropertyName("x-app-key")]
    public required string XAppKey { get; init; }
}