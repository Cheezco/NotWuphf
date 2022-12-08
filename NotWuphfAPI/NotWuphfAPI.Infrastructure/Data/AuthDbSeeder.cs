using Microsoft.AspNetCore.Identity;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Infrastructure.Data;

public class AuthDbSeeder
{
    private readonly UserManager<WuphfUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthDbSeeder(UserManager<WuphfUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedAsync()
    {
        await AddDefaultRoles();
        await AddAdminUser();
    }

    private async Task AddAdminUser()
    {
        var newAdminUser = new WuphfUser()
        {
            UserName = "admin",
            Email = "admin@admin.com",
        };
        
        var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
        if (existingAdminUser is null)
        {
            var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "!Password123");
            if (createAdminUserResult.Succeeded)
            {
                await _userManager.AddToRolesAsync(newAdminUser, Roles.All);
            }
        }
    }

    private async Task AddDefaultRoles()
    {
        foreach (var role in Roles.All)
        {
            var roleExists = await _roleManager.RoleExistsAsync(role);
            if (!roleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}