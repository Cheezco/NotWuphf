using Microsoft.AspNetCore.Identity;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Auth.Model;

public class WuphfUser : IdentityUser
{
    [PersonalData]
    public List<Group> Groups { get; set; }
    
    [PersonalData]
    public List<Group> OwnedGroups { get; set; }
}