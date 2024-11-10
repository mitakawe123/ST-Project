using FastEndpoints;
using FITAPI.Application.DTOs.Requests;
using FITAPI.Application.DTOs.Responses;
using FITAPI.Application.Services.Auth;
using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Endpoints;

public class RegisterUserEndpoint(UserManager<MyUser> userManager, IAuthService authService) : Endpoint<RegisterUserRequest, RegisterUserResponse>
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
            await SendAsync(new RegisterUserResponse("Email already exists", null, false), cancellation: ct);
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
            await SendAsync(new RegisterUserResponse("Email registered", token, true), cancellation: ct);
            return;
        } 
        
        await SendAsync(new RegisterUserResponse(string.Join("; ", result.Errors.Select(e => e.Description)), null,false), cancellation: ct);
    }
}