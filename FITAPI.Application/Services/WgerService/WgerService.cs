using Microsoft.Extensions.Logging;

namespace FITAPI.Application.Services.WgerService;

public class WgerService(HttpClient httpClient, ILogger<WgerService> logger) : IWgerService
{
    public async Task<string> GetExercisesAsync()
    {
        const string requestUrl = "https://wger.de/api/v2";

        try
        {
            var response = await httpClient.GetAsync($"{requestUrl}/exercise");
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching exercises from Wger");
            throw;
        }
    }
}