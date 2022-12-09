using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NotWuphfAPI.Core.Auth.Model;
using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Specifications;
using NotWuphfAPI.Infrastructure.Interfaces;

namespace NotWuphfAPI.Web.Controllers
{
    [Route("api/groups/{groupId:int}/members/{memberId}")]
    [ApiController]
    public class GroupMembershipController : ControllerBase
    {
        private readonly IRepository<Group> _groupRepository;
        private readonly UserManager<WuphfUser> _userManager;

        public GroupMembershipController(IRepository<Group> groupRepository, UserManager<WuphfUser> userManager)
        {
            _groupRepository = groupRepository;
            _userManager = userManager;
        }

        [HttpPost("join")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult> JoinGroup(int groupId, string memberId)
        {
            var spec = new GroupByIdWithMembersSpec(groupId);
            var group = await _groupRepository.SingleOrDefaultAsync(spec);
            
            if (group is null)
            {
                return NotFound();
            }
            
            var requestUserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            
            if (requestUserId != memberId && group.UserId != requestUserId)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(memberId);

            if (group.Members.Contains(user))
            {
                return BadRequest();
            }
            
            group.Members.Add(user);
            await _groupRepository.SaveChangesAsync();
            
            return Ok();
        }

        [HttpPost("leave")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult> LeaveGroup(int groupId, string memberId)
        {

            var spec = new GroupByIdWithMembersSpec(groupId);
            var group = await _groupRepository.SingleOrDefaultAsync(spec);
            
            if (group is null)
            {
                return NotFound();
            }

            var requestUserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            
            if (requestUserId != memberId && group.UserId != requestUserId)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(memberId);

            if (!group.Members.Contains(user))
            {
                return BadRequest();
            }
            
            group.Members.Remove(user);
            await _groupRepository.SaveChangesAsync();

            
            return Ok();
        }
    }
}