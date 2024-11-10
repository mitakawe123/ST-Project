namespace FITAPI.Application.Configurations;

public class MailSettings
{
    public required string MailtrapHost { get; init; }
    
    public required int MailtrapPort { get; init; }
    
    public required string MailtrapUser { get; init; }
    
    public required string MailtrapPass { get; init; }
    
    public required string FromEmail { get; init; }
    
    public required string FromName { get; init; }
}
    
