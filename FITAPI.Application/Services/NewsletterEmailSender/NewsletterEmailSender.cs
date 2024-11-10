using System.Net;
using System.Net.Mail;
using FITAPI.Application.Configurations;
using Microsoft.Extensions.Configuration;

namespace FITAPI.Application.Services.NewsletterEmailSender;

public class NewsletterEmailSender(IConfiguration configuration) : INewsletterEmailSender
{
    public async Task SendEmailAsync(string email)
    {
        var mailSettings = configuration.GetSection(nameof(MailSettings)).Get<MailSettings>()
            ?? throw new ArgumentNullException(nameof(MailSettings));
        
        var message = new MailMessage
        {
            From = new MailAddress(mailSettings.FromEmail, mailSettings.FromName),
            Subject = "FIT API",
            Body = "<div>Fit</div>",
            IsBodyHtml = true
        };

        message.To.Add(new MailAddress(email));

        using var smtp = new SmtpClient(mailSettings.MailtrapHost, mailSettings.MailtrapPort);
        smtp.Credentials = new NetworkCredential(mailSettings.MailtrapUser, mailSettings.MailtrapPass);
        smtp.EnableSsl = true;

        await smtp.SendMailAsync(message);
    }
}