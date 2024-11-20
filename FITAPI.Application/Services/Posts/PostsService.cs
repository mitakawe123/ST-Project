using FITAPI.Application.DTOs.Requests.Posts;
using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Application.Services.Posts;

public class PostsService(FitDbContext context, UserManager<MyUser> userManager) : IPostsService
{
    public async Task<IReadOnlyCollection<GetPostsResponse>> GetPostsAsync()
    {
        return await context.Posts
            .AsNoTracking()
            .Include(x => x.User)
            .Include(x => x.Comments)
            .OrderByDescending(x => x.CreatedAt)
            .Select(p => new GetPostsResponse(
                p.Id,
                p.Content,
                p.User.AvatarImg,
                p.Image,
                p.CreatedAt,
                p.Likes,
                p.Comments))
            .ToListAsync();
    }

    public async Task<IReadOnlyCollection<GetMyPostsResponse>> GetMyPostsAsync(GetMyPostsRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new Exception($"User with email {request.Email} does not exist");

        return await context.Posts
            .AsNoTracking()
            .Include(x => x.User)
            .Include(x => x.Comments)
            .OrderByDescending(x => x.CreatedAt)
            .Where(x => x.User.Id == user.Id)
            .Select(p => new GetMyPostsResponse(
                p.Id,
                p.Content,
                p.User.AvatarImg,
                p.Image,
                p.CreatedAt,
                p.Likes,
                p.Comments))
            .ToListAsync();
    }

    public async Task CreatePostAsync(CreatePostRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
                   ?? throw new Exception($"User with email {request.Email} does not exist");

        var post = new Domain.Models.Posts
        {
            UserId = user.Id,
            Content = request.Content,
            Image = request.Image,
        };

        await context.AddAsync(post);
        await context.SaveChangesAsync();
    }

    public async Task UpdatePostAsync(UpdatePostRequest request)
    {
        var post = await context.Posts.Where(x => x.Id == request.Id).FirstOrDefaultAsync()
            ?? throw new Exception($"Post with id {request.Id} does not exist");

        if (!string.IsNullOrEmpty(request.Content))
            post.Content = request.Content;

        if(!string.IsNullOrEmpty(request.Image))
            post.Image = request.Image;
        
        context.Update(post);
        await context.SaveChangesAsync();
    }

    public async Task DeletePostAsync(DeletePostRequest request)
    {
        var post = await context.Posts.Where(x => x.Id == request.Id).FirstOrDefaultAsync()
            ?? throw new Exception($"Post with id {request.Id} does not exist");
        
        context.Remove(post);
        await context.SaveChangesAsync();
    }

    public async Task LikePostAsync(LikePostRequest request)
    {
        var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId)
            ?? throw new Exception($"Post with id {request.PostId} does not exist");
        
        post.Likes++;
        
        context.Update(post);
        await context.SaveChangesAsync();
    }

    public async Task CommentPostAsync(CommentPostRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new Exception($"User with email {request.Email} does not exist");
        
        var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId)
            ?? throw new Exception($"Post with id {request.PostId} does not exist");
        
        post.Comments.Add(new Domain.Models.Comments
        {
            Content = request.Content,
            PostId = request.PostId,
            CreatedAt = DateTime.Now,
            UserId = user.Id
        });
        
        context.Update(post);
        await context.SaveChangesAsync();
    }
}