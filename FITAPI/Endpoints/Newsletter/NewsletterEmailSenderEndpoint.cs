using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Newsletter;
using FITAPI.Application.Services.NewsletterEmailSender;

namespace FITAPI.Endpoints.Newsletter;

public class NewsletterEmailSenderEndpoint(INewsletterEmailSender newsletterEmailSender) : Endpoint<NewsletterEmailSenderRequest>
{
    public override void Configure()
    {
        Post("/newsletter-email-sender");
    }

    public override async Task HandleAsync(NewsletterEmailSenderRequest req, CancellationToken ct)
    {
        await newsletterEmailSender.SendEmailAsync(req.Email);
        await SendAsync("Successfully send the newsletter", cancellation: ct);
    }
}