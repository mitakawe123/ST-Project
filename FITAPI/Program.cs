using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using FITAPI.Infrastructure.Configurations;

var bld = WebApplication.CreateBuilder();

bld.Services
    .AddInfrastructureServices(bld.Configuration)
    .AddAppServices()
    .AddAuthenticationJwtBearer(s => s.SigningKey = "The secret used to sign tokens") 
    .AddAuthorization()
    .AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.DocumentSettings = s =>
        {
            s.Title = "FITAPI";
            s.Version = "v1";
        };
    });

var app = bld.Build();

app.UseAuthentication() 
    .UseAuthorization() 
    .UseFastEndpoints()
    .UseSwaggerGen();

app.Run();