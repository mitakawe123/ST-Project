using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using FirebaseAdmin;
using FITAPI.Application.Configurations;
using FITAPI.Domain.Configurations;
using FITAPI.Infrastructure;
using FITAPI.Infrastructure.Configurations;
using Google;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var bld = WebApplication.CreateBuilder();
var jwtConfig  = bld.Configuration.GetSection(nameof(JwtConfiguration)).Get<JwtConfiguration>() ??
                 throw new NullReferenceException(nameof(JwtConfiguration));

//DB service
bld.Services
    .AddDbContext<FitDbContext>(options =>
    options
    .UseNpgsql(bld.Configuration
    .GetConnectionString("DefaultConnection")));

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