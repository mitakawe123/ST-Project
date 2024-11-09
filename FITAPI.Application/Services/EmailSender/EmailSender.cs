using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace FITAPI.Application.Services.EmailSender;

// This interface is forced by microsoft if I want to use the default endpoints for auth with identity user
public class EmailSender : IEmailSender<MyUser>
{
    public Task SendConfirmationLinkAsync(MyUser user, string email, string confirmationLink)
    {
        throw new NotImplementedException();
    }

    public Task SendPasswordResetLinkAsync(MyUser user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }

    public Task SendPasswordResetCodeAsync(MyUser user, string email, string resetCode)
    {
        throw new NotImplementedException();
    }
}