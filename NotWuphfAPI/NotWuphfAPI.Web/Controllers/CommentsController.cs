using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using NotWuphfAPI.Core.Auth.Model;
using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Extensions;
using NotWuphfAPI.Core.Misc;
using NotWuphfAPI.Core.Specifications;
using NotWuphfAPI.Infrastructure.Interfaces;

namespace NotWuphfAPI.Web.Controllers
{
    [Route("api/groups/{groupId}/posts/{postId}/comments")]
    [ApiController]
    [Authorize(Roles = GroupRoles.GroupUser)]
    public class CommentsController : ControllerBase
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Group> _groupsRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthorizationService _authorizationService;

        public CommentsController(IRepository<Post> postsRepository, IRepository<Group> groupsRepository,
            IRepository<Comment> commentsRepository, IAuthorizationService authorizationService)
        {
            _postsRepository = postsRepository;
            _groupsRepository = groupsRepository;
            _commentsRepository = commentsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetMany(int groupId, int postId, int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var postSpec = new PostByIdSpec(postId);

            if (!await _groupsRepository.AnyAsync(groupSpec)
                || !await _postsRepository.AnyAsync(postSpec)) return NotFound();

            var spec = new CommentsSpec(groupId, postId, page, pageSize);
            var comments = await _commentsRepository.ListAsync(spec);

            return comments.ToDTO();
        }

        [HttpGet("{commentId}")]
        public async Task<IActionResult> Get(int groupId, int postId, int commentId)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var postSpec = new PostByIdSpec(postId);
            var spec = new CommentByIdSpec(commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (!await _groupsRepository.AnyAsync(groupSpec)
                || !await _postsRepository.AnyAsync(postSpec)
                || comment is null) return NotFound();

            return Ok(comment.ToDTO());
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> Create(int groupId, int postId, CreateCommentDTO createCommentDTO)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var postSpec = new PostByIdSpec(postId);

            var post = await _postsRepository.FirstOrDefaultAsync(postSpec);

            if (!await _groupsRepository.AnyAsync(groupSpec)
                || post is null) return NotFound();

            var comment = new Comment()
            {
                Content = createCommentDTO.Content,
                CreationDate = DateTime.UtcNow,
                Post = post,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _commentsRepository.AddAsync(comment);

            return Created("", comment.ToDTO());
        }

        [HttpPut("{commentId}")]
        public async Task<ActionResult<CommentDTO>> Update(int groupId, int postId, int commentId, UpdateCommentDTO updateCommentDTO)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var postSpec = new PostByIdSpec(postId);
            var spec = new CommentByIdSpec(commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (!await _groupsRepository.AnyAsync(groupSpec)
                || !await _postsRepository.AnyAsync(postSpec)
                || comment is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            comment.Content = updateCommentDTO.Content;

            await _commentsRepository.UpdateAsync(comment);

            return Ok(comment.ToDTO());
        }

        [HttpDelete("{commentId}")]
        public async Task<ActionResult> Remove(int groupId, int postId, int commentId)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var postSpec = new PostByIdSpec(postId);
            var spec = new CommentByIdSpec(commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (!await _groupsRepository.AnyAsync(groupSpec)
                || !await _postsRepository.AnyAsync(postSpec)
                || comment is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await _commentsRepository.DeleteAsync(comment);

            return NoContent();
        }
    }
}
