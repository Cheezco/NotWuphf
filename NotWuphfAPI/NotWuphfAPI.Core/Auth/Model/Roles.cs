namespace NotWuphfAPI.Core.Auth.Model;

public static class Roles
{
    public const string Admin = nameof(Admin);
    public const string GroupUser = nameof(GroupUser);

    public static readonly IReadOnlyCollection<string> All = new[] { Admin, GroupUser };
}