namespace FITAPI.Application.DTOs.Requests.Contact;

public record ContactUsRequest(
    string FirstName,
    string LastName,
    string Email,
    string Subject,
    string Message);