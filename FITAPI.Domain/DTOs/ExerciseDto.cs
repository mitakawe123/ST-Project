using System.Text.Json.Serialization;

namespace FITAPI.Domain.DTOs;

public record ExerciseDto
{
    public int Count { get; init; }
    public string? Next { get; init; }
    public string? Previous { get; init; }
    public ICollection<Exercise> Results { get; init; } = new List<Exercise>();
}

public record Exercise
{
    public int Id { get; init; }
    public Guid Uuid { get; init; }
    public string Name { get; init; } = string.Empty;
    public int ExerciseBase { get; init; }
    public string Description { get; init; } = string.Empty;
    public DateTime Created { get; init; }
    public required BaseDto Category { get; init; }
    public required ICollection<Muscles> Muscles { get; init; } 
    public ICollection<int> MusclesSecondary { get; init; } = new List<int>();
    public required ICollection<BaseDto> Equipment { get; init; }
    public int Language { get; init; }
    public required License License { get; init; }
    public string? LicenseAuthor { get; init; }
    public ICollection<int> Variations { get; init; } = new List<int>();
    public ICollection<string> AuthorHistory { get; init; } = new List<string>();
}

public record Muscles
{
    public int Id { get; init; }
    
    public required string Name { get; init; }
    
    [JsonPropertyName("name_en")]
    public required string NameEn { get; init; }
    
    [JsonPropertyName("is_front")]
    public bool IsFront { get; init; }
    
    [JsonPropertyName("image_url_main")]
    public string? ImageUrlMain { get; init; }
    
    [JsonPropertyName("image_url_secondary")]
    public string? ImageUrlSecondary { get; init; }
}

public record License
{
    public int Id { get; init; }
    
    [JsonPropertyName("full_name")]
    public required string FullName { get; init; }
    
    [JsonPropertyName("short_name")]
    public required string ShortName { get; init; }
    
    public required string Url { get; init; }
}