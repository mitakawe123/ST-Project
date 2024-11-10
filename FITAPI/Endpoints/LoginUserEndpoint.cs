using FastEndpoints;
using FastEndpoints.Security;
using FITAPI.Application.DTOs.Requests;
using FITAPI.Application.Services.Auth;
using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Endpoints;

public class LoginUserEndpoint(UserManager<MyUser> userManager, IAuthService authService) : Endpoint<LoginUserRequest>
{
    public override void Configure()
    {
        Post("/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(LoginUserRequest req, CancellationToken ct)
    {
        var existingUser = await userManager.FindByEmailAsync(req.Email);
        if (existingUser is null)
        {
            await SendErrorsAsync(cancellation: ct);
            return;
        }
    
        var validPassword = await userManager.CheckPasswordAsync(existingUser, req.Password);
        if (!validPassword)
        {
            await SendErrorsAsync(cancellation: ct);
            return;
        }
    
        var token = await authService.CreateToken(existingUser);
        await SendAsync(new TokenResponse
        {
            AccessToken = token,
        }, cancellation: ct);
    }
}