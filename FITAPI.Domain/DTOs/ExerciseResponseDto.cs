namespace FITAPI.Domain.DTOs;

public record ExerciseResponseDto
{
    public int Count { get; init; }
    public string? Next { get; init; }
    public string? Previous { get; init; }
    public List<Exercise> Results { get; init; } = new();
}

public record Exercise
{
    public int Id { get; init; }
    public Guid Uuid { get; init; }
    public string Name { get; init; } = string.Empty;
    public int ExerciseBase { get; init; }
    public string Description { get; init; } = string.Empty;
    public DateTime Created { get; init; }
    public int Category { get; init; }
    public List<int> Muscles { get; init; } = new();
    public List<int> MusclesSecondary { get; init; } = new();
    public List<int> Equipment { get; init; } = new();
    public int Language { get; init; }
    public int License { get; init; }
    public string LicenseAuthor { get; init; } = string.Empty;
    public List<int> Variations { get; init; } = new();
    public List<string> AuthorHistory { get; init; } = new();
}