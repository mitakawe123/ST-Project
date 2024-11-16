namespace FITAPI.Application.Configurations;

public class JwtConfiguration
{
    public required string SigningKey { get; init; }
    
    public required string Issuer { get; init; }
    
    public required string Audience { get; init; }
}