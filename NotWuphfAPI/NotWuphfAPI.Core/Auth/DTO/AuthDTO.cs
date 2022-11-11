using System.ComponentModel.DataAnnotations;

namespace NotWuphfAPI.Core.Auth.DTO;

public record RegisterUserDTO([Required]string UserName, [EmailAddress][Required] string Email, [Required] string Password);

public record LoginUserDTO([Required] string UserName, [Required] string Password);

public record UserDTO(string Id, string UserName, string Email);

public record SuccessfulLoginDTO(string AccessToken);