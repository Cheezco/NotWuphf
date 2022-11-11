using System.ComponentModel.DataAnnotations;

namespace NotWuphfAPI.Core.Auth.Model;

public interface IUserOwnedResource
{
    [Required]
    public string UserId { get; }
    
}