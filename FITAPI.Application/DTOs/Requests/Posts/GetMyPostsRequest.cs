using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Posts;

public record GetMyPostsRequest([FromQuery] string Email);
    
