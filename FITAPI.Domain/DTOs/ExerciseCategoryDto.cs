namespace FITAPI.Domain.DTOs;

public abstract record ExerciseCategoryDto
{
    public short Id { get; init; }
    public required string Name { get; init; }
}