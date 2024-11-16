namespace FITAPI.Domain.Models;

public class Posts
{
    public long Id { get; init; }
    
    public required string UserId { get; init; }
    
    public required string Content { get; init; }
    
    public string? Image { get; init; }
    
    public long Likes { get; init; }
    
    public required long CommentId { get; init; }
    
    public virtual required MyUser User { get; init; }
    
    public virtual required ICollection<Comments> Comments { get; init; }
}