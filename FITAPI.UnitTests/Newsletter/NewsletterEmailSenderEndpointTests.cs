using FastEndpoints;
using FakeItEasy;
using FITAPI.Application.DTOs.Requests.Newsletter;
using FITAPI.Application.Services.NewsletterEmailSender;
using FITAPI.Endpoints.Newsletter;

namespace FITAPI.UnitTests.Newsletter;

public class NewsletterEmailSenderEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldSendNewsletterEmailSuccessfully()
    {
        var newsletterEmailSender = A.Fake<INewsletterEmailSender>();
        var endpoint = Factory.Create<NewsletterEmailSenderEndpoint>(newsletterEmailSender);

        var newsletterRequest = new NewsletterEmailSenderRequest
        {
            Email = "test@example.com"
        };

        await endpoint.HandleAsync(newsletterRequest, CancellationToken.None);

        A.CallTo(() => newsletterEmailSender.SendEmailAsync(newsletterRequest.Email))
            .MustHaveHappenedOnceExactly();

        Assert.False(endpoint.ValidationFailed); 
        Assert.Equal("Successfully send the newsletter", endpoint.Response); 
    }
}