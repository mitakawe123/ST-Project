using FITAPI.Application.DTOs.Requests.Comments;

namespace FITAPI.Application.Services.Comments;

public interface ICommentsService
{
    Task CreateCommentAsync(CreateCommentRequest request);
    
    Task UpdateCommentAsync(UpdateCommentRequest request);
    
    Task DeleteCommentAsync(DeleteCommentReqeust request);
}