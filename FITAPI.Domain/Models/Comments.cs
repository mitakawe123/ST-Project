namespace FITAPI.Domain.Models;

public class Comments
{
    public long Id { get; init; }
    
    public required string UserId { get; init; }
    
    public required long PostId { get; init; }
        
    public required string Content { get; set; }

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    
    public virtual MyUser User { get; init; }
    
    public virtual Posts Post { get; init; }
}