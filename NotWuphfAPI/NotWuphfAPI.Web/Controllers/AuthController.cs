using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NotWuphfAPI.Core.Auth;
using NotWuphfAPI.Core.Auth.DTO;
using NotWuphfAPI.Core.Auth.Extensions;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Web.Controllers
{
    [Route("api")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<WuphfUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(UserManager<WuphfUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = await _userManager.FindByNameAsync(registerUserDto.UserName);

            if (user is not null) return BadRequest("Request invalid.");

            var newUser = new WuphfUser
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.UserName
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);

            if (!createUserResult.Succeeded)
                return BadRequest("Could not create user.");

            await _userManager.AddToRoleAsync(newUser, GroupRoles.GroupUser);

            return CreatedAtAction(nameof(Register), newUser.ToDto());
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {
            var user = await _userManager.FindByNameAsync(loginUserDto.UserName);

            if (user is null) return BadRequest("User name or password is invalid.");
            
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);

            if (!isPasswordValid) return BadRequest("User name or password is invalid.");

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
            
            return Ok(new SuccessfulLoginDto(accessToken));
        }
    }
}
