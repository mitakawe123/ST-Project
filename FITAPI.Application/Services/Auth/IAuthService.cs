using FirebaseAdmin.Auth;
using FITAPI.Domain.Models;

namespace FITAPI.Application.Services.Auth;

public interface IAuthService
{
    Task<string> CreateToken(MyUser req);
    
    Task<FirebaseToken> ValidateTokenAsync(string idToken);
}