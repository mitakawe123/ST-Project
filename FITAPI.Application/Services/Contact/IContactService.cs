using FITAPI.Application.DTOs.Requests.Contact;

namespace FITAPI.Application.Services.Contact;

public interface IContactService
{
    Task ContactUsAsync(ContactUsRequest request, CancellationToken cancellation);
}