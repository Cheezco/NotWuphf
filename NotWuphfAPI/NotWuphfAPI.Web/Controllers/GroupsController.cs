using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotWuphfAPI.Core.Auth.Model;
using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Extensions;
using NotWuphfAPI.Core.Misc;
using NotWuphfAPI.Core.Specifications;
using NotWuphfAPI.Infrastructure.Interfaces;

namespace NotWuphfAPI.Web.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IRepository<Group> _groupsRepository;
        private readonly IAuthorizationService _authorizationService;

        public GroupsController(IRepository<Group> groupsRepository, IAuthorizationService authorizationService)
        {
            _groupsRepository = groupsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<GroupDTO>> GetMany(int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var groupSpec = new GroupsSpec(page, pageSize);
            var groups = await _groupsRepository.ListAsync(groupSpec);

            return groups.ToDTO();
        }

        [HttpGet("{groupId}")]
        public async Task<IActionResult> Get(int groupId)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();


            return Ok(group.ToDTO());
        }

        [HttpPost]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<GroupDTO>> Create(CreateGroupDTO createGroupDTO)
        {
            var group = new Group()
            {
                Name = createGroupDTO.Name,
                Description = createGroupDTO.Description,
                Visibility = createGroupDTO.Visibility,
                CreationDate = DateTime.UtcNow,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };
            
            Console.WriteLine(User);

            await _groupsRepository.AddAsync(group);

            return Created("", group.ToDTO());
        }

        [HttpPut("{groupId}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<GroupDTO>> Update(int groupId, UpdateGroupDTO updateGroupDTO)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, group, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            group.Name = updateGroupDTO.Name;
            group.Description = updateGroupDTO.Description;
            group.Visibility = updateGroupDTO.Visibility;

            await _groupsRepository.UpdateAsync(group);

            return Ok(group.ToDTO());
        }

        [HttpDelete("{groupId}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult> Remove(int groupId)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, group, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await _groupsRepository.DeleteAsync(group);

            return NoContent();
        }
    }
}
