using System.ComponentModel.DataAnnotations;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Auth.Model;

public interface IGroupResource
{
    [Required]
    public string UserId { get; }
    [Required]
    public string GroupOwnerId { get; }
}