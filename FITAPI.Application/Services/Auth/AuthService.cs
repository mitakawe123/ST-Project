using FastEndpoints.Security;
using FirebaseAdmin.Auth;
using FITAPI.Application.Configurations;
using FITAPI.Domain.Models;
using Microsoft.Extensions.Configuration;

namespace FITAPI.Application.Services.Auth;

public class AuthService(IConfiguration configuration) : IAuthService
{
    public Task<string> CreateToken(MyUser req)
    {
        var signinKey = configuration.GetSection(nameof(JwtConfiguration)).Get<JwtConfiguration>() ??
                           throw new NullReferenceException(nameof(JwtConfiguration));
        
        if(string.IsNullOrEmpty(req.Email))
            throw new NullReferenceException(nameof(req.Email));
        
        var jwtToken = JwtBearer.CreateToken(
            options =>
            {
                options.SigningKey = signinKey.SigningKey;
                options.ExpireAt = DateTime.UtcNow.AddDays(1);
                options.User.Claims.Add(("Email", req.Email));
            });
        
        return Task.FromResult(jwtToken);  
    }

    public async Task<FirebaseToken> ValidateTokenAsync(string idToken)
    {
        return await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
    }
}