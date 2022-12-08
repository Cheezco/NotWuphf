using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Auth;

public class ResourceOwnerAuthorizationHandler : AuthorizationHandler<ResourceOwnerRequirement, IUserOwnedResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        ResourceOwnerRequirement requirement, IUserOwnedResource resource)
    {
        if (context.User.IsInRole(Roles.Admin) ||
            context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) == resource.UserId)
        {
            context.Succeed(requirement);
        }
        
        return Task.CompletedTask;
    }
}

public record ResourceOwnerRequirement : IAuthorizationRequirement;