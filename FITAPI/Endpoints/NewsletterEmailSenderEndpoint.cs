using FastEndpoints;
using FITAPI.Application.DTOs.Requests;
using FITAPI.Application.Services.NewsletterEmailSender;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FITAPI.Endpoints;

public class NewsletterEmailSenderEndpoint(INewsletterEmailSender newsletterEmailSender) : Endpoint<NewsletterEmailSenderRequest>
{
    public override void Configure()
    {
        Post("/newsletter-email-sender");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(NewsletterEmailSenderRequest req, CancellationToken ct)
    {
        await newsletterEmailSender.SendEmailAsync(req.Email);
        await SendAsync("Successfully send the newsletter", cancellation: ct);
    }
}