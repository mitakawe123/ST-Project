using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Posts;

public record GetAllPostsRequest([FromQuery] string Email);