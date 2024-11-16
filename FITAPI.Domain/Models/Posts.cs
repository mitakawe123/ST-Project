namespace FITAPI.Domain.Models;

public class Posts
{
    public long Id { get; init; }
    
    public required string UserId { get; init; }
    
    public required string Content { get; set; }
    
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    
    public string? Image { get; set; }
    
    public long Likes { get; init; }
    
    public long CommentId { get; init; }
    
    public virtual MyUser User { get; init; }
    
    public virtual ICollection<Comments> Comments { get; init; }
}