using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public GroupsController(IRepository<Group> groupsRepository)
        {
            _groupsRepository = groupsRepository;
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
        public async Task<ActionResult<GroupDTO>> Create(CreateGroupDTO createGroupDTO)
        {
            var group = new Group()
            {
                Name = createGroupDTO.Name,
                Description = createGroupDTO.Description,
                Visibility = createGroupDTO.Visibility,
                CreationDate = DateTime.UtcNow,
            };

            await _groupsRepository.AddAsync(group);

            return Created("", group.ToDTO());
        }

        [HttpPut("{groupId}")]
        public async Task<ActionResult<GroupDTO>> Update(int groupId, UpdateGroupDTO updateGroupDTO)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) NotFound();

            group.Name = updateGroupDTO.Name;
            group.Description = updateGroupDTO.Description;
            group.Visibility = updateGroupDTO.Visibility;

            await _groupsRepository.UpdateAsync(group);

            return Ok(group.ToDTO());
        }

        [HttpDelete("{groupId}")]
        public async Task<ActionResult> Remove(int groupId)
        {
            var spec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.FirstOrDefaultAsync(spec);

            if (group is null) return NotFound();

            await _groupsRepository.DeleteAsync(group);

            return NoContent();
        }
    }
}
