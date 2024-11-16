using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using FirebaseAdmin;
using FITAPI.Application.Configurations;
using FITAPI.Domain.Configurations;
using FITAPI.Infrastructure.Configurations;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var bld = WebApplication.CreateBuilder();
var jwtConfig  = bld.Configuration.GetSection(nameof(JwtConfiguration)).Get<JwtConfiguration>() ??
                 throw new NullReferenceException(nameof(JwtConfiguration));

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("../../fitconnect-af4b6-firebase-adminsdk-no0dz-df8250c3be.json")
});

bld.Services
    .AddInfrastructureServices(bld.Configuration)
    .AddIdentityServices()
    .AddAppServices()
    .AddAuthenticationJwtBearer(options => options.SigningKey = jwtConfig.SigningKey)
    .AddAuthentication(o =>
    {
        o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    });
    
bld.Services.AddAuthorization()
    .AddCorsServices()
    .AddFastEndpoints()
    .SwaggerDocument(options =>
    {
        options.EnableJWTBearerAuth = true;
        options.DocumentSettings = s =>
        {
            s.EnableJWTBearerAuth();
            s.DocumentName = "Initial-Release";
            s.Title = "FITAPI";
            s.Version = "v1.0";
        };
    });

var app = bld.Build();

app.UseAuthentication() 
    .UseAuthorization() 
    .UseDefaultExceptionHandler()
    .UseFastEndpoints(c => c.Endpoints.RoutePrefix = "api")
    .UseSwaggerGen()
    .UseCors("CorsPolicy");

app.Run();