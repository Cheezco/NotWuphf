using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
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

        [HttpGet(Name = "GetGroups")]
        public async Task<IEnumerable<GroupDto>> GetMany(int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var groupSpec = new GroupsSpec(page, pageSize);
            var groups = await _groupsRepository.ListAsync(groupSpec);

            var totalCount = await _groupsRepository.CountAsync();
            var totalPages = PaginationHelper.CalculateTotalPages(pageSize, totalCount);
            var currentPage = PaginationHelper.GetCurrentPage(totalCount, page);
            var fixedPageSize = PaginationHelper.CalculatePageSize(pageSize);

            var previousPageLink = PaginationHelper.HasPreviousPage(totalPages, currentPage)
                ? CreateResourceUri(currentPage, fixedPageSize,
                    ResourceUriType.PreviousPage)
                : null;
            
            var nextPageLink = PaginationHelper.HasNextPage(totalPages, currentPage) ?
                CreateResourceUri(currentPage, fixedPageSize, ResourceUriType.NextPage) : null;
            
            var paginationMetadata = new
            {
                totalCount,
                pageSize = fixedPageSize,
                currentPage,
                totalPages,
                previousPageLink,
                nextPageLink
            };
            
            Response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationMetadata));

            return groups.ToDto();
        }

        [HttpGet("{groupId}")]
        public async Task<IActionResult> Get(int groupId)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();


            return Ok(group.ToDto());
        }

        [HttpPost]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<GroupDto>> Create(CreateGroupDto createGroupDto)
        {
            var group = new Group()
            {
                Name = createGroupDto.Name,
                Description = createGroupDto.Description,
                Visibility = createGroupDto.Visibility,
                CreationDate = DateTime.UtcNow,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };
            
            Console.WriteLine(User);

            await _groupsRepository.AddAsync(group);

            return Created("", group.ToDto());
        }

        [HttpPut("{groupId:int}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<GroupDto>> Update(int groupId, UpdateGroupDto updateGroupDto)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, group, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            group.Name = updateGroupDto.Name;
            group.Description = updateGroupDto.Description;
            group.Visibility = updateGroupDto.Visibility;

            await _groupsRepository.UpdateAsync(group);

            return Ok(group.ToDto());
        }

        [HttpDelete("{groupId:int}")]
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

        private string? CreateResourceUri(int page, int pageSize, ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetGroups", new
                {
                    page = page - 1,
                    pageSize
                }),
                ResourceUriType.NextPage => Url.Link("GetGroups", new
                {
                    page = page + 1,
                    pageSize
                }),
                _ => Url.Link("GetTopics", new
                {
                    page,
                    pageSize
                })
            };
        }
    }
}
