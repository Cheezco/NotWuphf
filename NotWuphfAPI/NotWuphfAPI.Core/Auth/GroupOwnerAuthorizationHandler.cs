using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Auth;

public class GroupOwnerAuthorizationHandler: AuthorizationHandler<GroupRequirement, IGroupResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, GroupRequirement requirement, IGroupResource resource)
    {
        var requestUserId = context.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (context.User.IsInRole(GroupRoles.Admin) ||
            requestUserId == resource.UserId ||
            requestUserId == resource.GroupOwnerId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

public record GroupRequirement : IAuthorizationRequirement;