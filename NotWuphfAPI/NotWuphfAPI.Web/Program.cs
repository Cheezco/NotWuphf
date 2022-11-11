using System.IdentityModel.Tokens.Jwt;
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

var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
await dbSeeder.SeedAsync();

app.Run();
