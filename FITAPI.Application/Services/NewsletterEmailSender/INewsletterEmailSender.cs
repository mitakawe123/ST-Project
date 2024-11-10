namespace FITAPI.Application.Services.NewsletterEmailSender;

public interface INewsletterEmailSender
{
    Task SendEmailAsync(string email);
}