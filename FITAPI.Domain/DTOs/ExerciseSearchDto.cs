using System.Text.Json.Serialization;

namespace FITAPI.Domain.DTOs;

public record ExerciseSearchDto
{
    public List<ExercisesDto> Suggestions { get; init; }
}

public record ExercisesDto(
    string Value,
    ExerciseDataDto Data
);
    
public record ExerciseDataDto(
    int Id,
    string Name,
    string Category,
    string? Image)
{
    [JsonPropertyName("base_id")]
    public int BaseId { get; init; }
    
    [JsonPropertyName("image_thumbnail")]
    public string? ImageThumbnail { get; init; }
}
