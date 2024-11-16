using FITAPI.Application.DTOs.Responses.Posts;
using FITAPI.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Application.Services.Posts;

public class PostsService(FitDbContext context) : IPostsService
{
    public async Task<IReadOnlyCollection<GetPostsResponse>> GetPostsAsync()
    {
        return await context.Posts
            .AsNoTracking()
            .Include(x => x.User)
            .Include(x => x.Comments)
            .Select(p => new GetPostsResponse(
                p.Id,
                p.Content,
                p.User.AvatarImg,
                p.Image,
                p.Likes,
                p.Comments))
            .ToListAsync();
    }
}