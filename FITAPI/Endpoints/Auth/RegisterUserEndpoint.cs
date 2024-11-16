using FastEndpoints;
using FastEndpoints.Security;
using FITAPI.Application.DTOs.Requests;
using FITAPI.Application.DTOs.Responses;
using FITAPI.Application.Services.Auth;
using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Endpoints;

public class RegisterUserEndpoint(UserManager<MyUser> userManager, IAuthService authService) : Endpoint<RegisterUserRequest, TokenResponse>
{
    public override void Configure()
    {
        Post("/register");
        AllowAnonymous();
    }

    public override async Task HandleAsync(RegisterUserRequest req, CancellationToken ct)
    {
        var existingUser = await userManager.FindByEmailAsync(req.Email);
        if (existingUser is not null)
        {
            await SendErrorsAsync(cancellation: ct);
            return;
        }

        var newUser = new MyUser
        {
            Email = req.Email,
            UserName = req.UserName
        };
        
        var result = await userManager.CreateAsync(newUser, req.Password);
        if (result.Succeeded)
        {
            var token = await authService.CreateToken(newUser);
            await SendAsync(new TokenResponse
            {
                AccessToken = token
            }, cancellation: ct);
            return;
        } 
        
        await SendErrorsAsync(cancellation: ct);
    }
}