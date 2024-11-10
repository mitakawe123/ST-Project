using FITAPI.Domain.Models;

namespace FITAPI.Application.Services.Auth;

public interface IAuthService
{
    Task<string> CreateToken(MyUser req);
}