using FastEndpoints;
using FastEndpoints.Security;
using FITAPI.Application.DTOs.Requests.Auth;
using FITAPI.Application.Services.Auth;
using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Endpoints.Auth;

public class GoogleAuthEndpoint(UserManager<MyUser> userManager, IAuthService authService) : Endpoint<FirebaseAuthRequest>
{
    public override void Configure()
    {
        Post("/googleauth");
        AllowAnonymous();
    }

    public override async Task HandleAsync(FirebaseAuthRequest req, CancellationToken ct)
    {
        try
        {
            var firebaseToken = await authService.ValidateTokenAsync(req.IdToken);
            var email = firebaseToken.Claims["email"].ToString();
            var name = firebaseToken.Claims["name"].ToString();
            if (string.IsNullOrEmpty(email))
                ThrowError("No email found", StatusCodes.Status400BadRequest);

            // Find or create the user in your Identity system
            var user = await userManager.FindByEmailAsync(email);
            if (user is null)
            {
                user = new MyUser
                {
                    UserName = name,
                    Email = email
                };
                var res = await userManager.CreateAsync(user);
                if(!res.Succeeded)
                    ThrowError($"Failed to create user because: {string.Join(", ", res.Errors.Select(x => x.Description))}", StatusCodes.Status400BadRequest);
            }

            // Generate a JWT for the user
            var jwt = await authService.CreateToken(user);
            await SendAsync(new TokenResponse
            {
                AccessToken = jwt
            }, cancellation: ct);
        }
        catch (Exception ex)
        {
            ThrowError($"Firebase token validation failed: {ex.Message}");
        }
    }
}