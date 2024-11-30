using System.Net;
using System.Net.Mail;
using FITAPI.Application.DTOs.Requests.Contact;
using FITAPI.Domain.Configurations;
using Microsoft.Extensions.Configuration;

namespace FITAPI.Application.Services.Contact;

public class ContactService(IConfiguration configuration) : IContactService
{
    public async Task ContactUsAsync(ContactUsRequest request, CancellationToken cancellation)
    {
        var mailSettings = configuration.GetSection(nameof(MailSettings)).Get<MailSettings>()
                           ?? throw new ArgumentNullException(nameof(MailSettings));

        string apiProjectDirectory = Directory.GetCurrentDirectory();
        string appProjectDirectory = Path.Combine(apiProjectDirectory, "../FITAPI.Application/Services/Contact");
        string emailTemplatePath = Path.Combine(appProjectDirectory, "contact-us.html");

        string emailTemplate = await File.ReadAllTextAsync(emailTemplatePath, cancellation);

        emailTemplate = emailTemplate
            .Replace("{{FirstName}}", request.FirstName)
            .Replace("{{LastName}}", request.LastName)
            .Replace("{{Subject}}", request.Subject)
            .Replace("{{Message}}", request.Message)
            .Replace("{{Email}}", request.Email);
        
        var message = new MailMessage
        {
            From = new MailAddress(request.Email, $"{request.FirstName} {request.LastName}"),
            Subject = "FIT API",
            Body = emailTemplate,
            IsBodyHtml = true
        };

        message.To.Add(new MailAddress(mailSettings.FromEmail));

        using var smtp = new SmtpClient(mailSettings.MailtrapHost, mailSettings.MailtrapPort);
        smtp.Credentials = new NetworkCredential(mailSettings.MailtrapUser, mailSettings.MailtrapPass);
        smtp.EnableSsl = true;

        await smtp.SendMailAsync(message, cancellation);
    }
}