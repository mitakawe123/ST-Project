using Microsoft.AspNetCore.Mvc;

namespace FITAPI.Application.DTOs.Requests.Comments;

public record DeleteCommentReqeust([FromRoute] long Id);