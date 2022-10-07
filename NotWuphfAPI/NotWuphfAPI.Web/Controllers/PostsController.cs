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
    [Route("api/groups/{groupId}/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Group> _groupsRepository;

        public PostsController(IRepository<Post> postsRepository, IRepository<Group> groupsRepository)
        {
            _postsRepository = postsRepository;
            _groupsRepository = groupsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetMany(int groupId, int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var groupSpec = new GroupByIdSpec(groupId);

            if (!await _groupsRepository.AnyAsync(groupSpec)) return NotFound();

            var spec = new PostsSpec(groupId, page, pageSize);
            var posts = await _postsRepository.ListAsync(spec);

            return posts.ToDTO();
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> Get(int groupId, int postId)
        {
            var groupSpec = new GroupByIdSpec(groupId);

            if (!await _groupsRepository.AnyAsync(groupSpec)) return NotFound();

            var spec = new PostByIdSpec(postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();

            return Ok(post.ToDTO());
        }

        [HttpPost]
        public async Task<ActionResult<PostDTO>> Create(int groupId, CreatePostDTO createPostDTO)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var group = await _groupsRepository.SingleOrDefaultAsync(groupSpec);

            if (group is null) return NotFound();

            var post = new Post()
            {
                Body = createPostDTO.Body,
                Name = createPostDTO.Name,
                CreationDate = DateTime.UtcNow,
                Group = group
            };

            await _postsRepository.AddAsync(post);

            return Created("", post.ToDTO());
        }

        [HttpPut("{postId}")]
        public async Task<ActionResult<PostDTO>> Update(int groupId, int postId, UpdatePostDTO updatePostDTO)
        {
            var groupSpec = new GroupByIdSpec(groupId);

            if (!await _groupsRepository.AnyAsync(groupSpec)) return NotFound();

            var spec = new PostByIdSpec(postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();

            post.Body = updatePostDTO.Body;

            await _postsRepository.UpdateAsync(post);

            return Ok(post.ToDTO());
        }

        [HttpDelete("{postId}")]
        public async Task<ActionResult> Remove(int groupId, int postId)
        {
            var groupSpec = new GroupByIdSpec(groupId);

            if (!await _groupsRepository.AnyAsync(groupSpec)) return NotFound();

            var spec = new PostByIdSpec(postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();

            await _postsRepository.DeleteAsync(post);

            return NoContent();
        }
    }
}
