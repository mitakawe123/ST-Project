using FITAPI.Application.DTOs.Requests.Comments;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Application.Services.Comments;

public class CommentsService(UserManager<MyUser> userManager, FitDbContext context) : ICommentsService
{
    public async Task CreateCommentAsync(CreateCommentRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new Exception($"User with email {request.Email} does not exist"); 
    
        var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId)
            ?? throw new Exception($"Post with id {request.PostId} does not exist");
        
        var comment = new Domain.Models.Comments
        {
            UserId = user.Id,
            PostId = request.PostId,
            Content = request.Content,
        };
        
        post.Comments.Add(comment);

        context.Update(post);
        await context.AddAsync(comment);
        await context.SaveChangesAsync();
    }

    public async Task UpdateCommentAsync(UpdateCommentRequest request)
    {
        var comment = await context.Comments.FirstOrDefaultAsync(x => x.Id == request.Id)
            ?? throw new Exception($"Comment with id {request.Id} does not exist");
        
        comment.Content = request.Content;
        
        context.Update(comment);
        await context.SaveChangesAsync();
    }

    public async Task DeleteCommentAsync(DeleteCommentReqeust request)
    {
        var comment = await context.Comments.FirstOrDefaultAsync(x => x.Id == request.Id)
            ?? throw new Exception($"Comment with id {request.Id} does not exist");
        
        context.Remove(comment);
        await context.SaveChangesAsync();
    }
}