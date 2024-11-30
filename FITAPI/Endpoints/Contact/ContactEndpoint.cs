using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Contact;
using FITAPI.Application.Services.Contact;

namespace FITAPI.Endpoints.Contact;

public class ContactEndpoint(IContactService contactService) : Endpoint<ContactUsRequest>
{
    public override void Configure()
    {
        Post("/contact-us");
    }

    public override async Task HandleAsync(ContactUsRequest req, CancellationToken ct)
    {
        await contactService.ContactUsAsync(req, ct).ConfigureAwait(false);
        await SendAsync("Successfully send email", cancellation: ct).ConfigureAwait(false);
    }
}