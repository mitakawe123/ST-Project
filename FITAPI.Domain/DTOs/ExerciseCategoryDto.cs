namespace FITAPI.Domain.DTOs;

public record ExerciseCategoryDto
{
    public short Id { get; init; }
    public required string Name { get; init; }
}