using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Posts;

public record DeletePostRequest([FromRoute] long Id);
