using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Contact;
using FITAPI.Application.Services.Contact;
using FITAPI.Endpoints.Contact;

namespace FITAPI.UnitTests.Contact;

public class ContactEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldSendEmailSuccessfully()
    {
        var contactService = A.Fake<IContactService>();
        var ep = Factory.Create<ContactEndpoint>(contactService);

        var contactUsRequest = new ContactUsRequest(
            "John", "Doe", "john.doe@example.com", "Inquiry", "I have a question about the service.");

        A.CallTo(() => contactService.ContactUsAsync(A<ContactUsRequest>.Ignored, default))
            .Returns(Task.CompletedTask);

        await ep.HandleAsync(contactUsRequest, default);

        A.CallTo(() => contactService.ContactUsAsync(A<ContactUsRequest>.Ignored, default)).MustHaveHappenedOnceExactly();
        Assert.False(ep.ValidationFailed); 
        Assert.Equal("Successfully send email", ep.Response); 
    }
}