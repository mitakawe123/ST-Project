namespace FITAPI.Domain.Models;

public class Comments
{
    public long Id { get; init; }
    
    public required string UserId { get; init; }
    
    public required long PostId { get; init; }
        
    public required string Content { get; init; }
    
    public required long Likes { get; init; } 
    
    public virtual required MyUser User { get; init; }
    
    public virtual required Posts Post { get; init; }
}