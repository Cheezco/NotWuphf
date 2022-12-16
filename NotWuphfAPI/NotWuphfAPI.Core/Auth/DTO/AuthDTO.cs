using System.ComponentModel.DataAnnotations;

namespace NotWuphfAPI.Core.Auth.DTO;

public record RegisterUserDto([Required]string UserName, [EmailAddress][Required] string Email, [Required] string Password);

public record LoginUserDto([Required] string UserName, [Required] string Password);

public record UserDto(string Id, string UserName, string Email);

public record SuccessfulLoginDto(string AccessToken);