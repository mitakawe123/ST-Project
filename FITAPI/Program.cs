using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using FITAPI.Application.Configurations;
using FITAPI.Application.Services.EmailSender;
using FITAPI.Domain.Models;
using FITAPI.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity;

var bld = WebApplication.CreateBuilder();
var jwtConfig  = bld.Configuration.GetSection(nameof(JwtConfiguration)).Get<JwtConfiguration>() ??
                 throw new NullReferenceException(nameof(JwtConfiguration));

bld.Services
    .AddInfrastructureServices(bld.Configuration)
    .AddIdentityServices()
    .AddAppServices()
    .AddAuthenticationJwtBearer(s => s.SigningKey = jwtConfig.SigningKey) 
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

bld.Services.AddTransient<IEmailSender<MyUser>, EmailSender>();

var app = bld.Build();

app.UseAuthentication() 
    .UseAuthorization() 
    .UseDefaultExceptionHandler()
    .UseFastEndpoints(c => c.Endpoints.RoutePrefix = "api")
    .UseSwaggerGen();

app.MapIdentityApi<MyUser>();

app.Run();