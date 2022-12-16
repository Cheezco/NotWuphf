using NotWuphfAPI.Core.Auth.DTO;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Auth.Extensions;

public static class UserExtensions
{
    public static UserDto ToDto(this WuphfUser user)
        => new(user.Id, user.UserName, user.Email);
}