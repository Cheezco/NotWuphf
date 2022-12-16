using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using NotWuphfAPI.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddControllers();

NotWuphfAPI.Infrastructure.Dependencies.ConfigureServices(builder.Configuration, builder.Services);

var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<MainContext>();
dbContext.Database.Migrate();

var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
await dbSeeder.SeedAsync();

app.UseCors("AllowAll");

app.Run();
