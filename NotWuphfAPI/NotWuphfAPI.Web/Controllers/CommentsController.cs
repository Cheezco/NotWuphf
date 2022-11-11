using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
    [Route("api/groups/{groupId:int}/posts/{postId:int}/comments")]
    [ApiController]
    [Authorize(Roles = GroupRoles.GroupUser)]
    public class CommentsController : ControllerBase
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthorizationService _authorizationService;

        public CommentsController(IRepository<Post> postsRepository, IRepository<Comment> commentsRepository, IAuthorizationService authorizationService)
        {
            _postsRepository = postsRepository;
            _commentsRepository = commentsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetMany(int groupId, int postId, int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var spec = new CommentsSpec(groupId, postId, page, pageSize);
            var comments = await _commentsRepository.ListAsync(spec);

            return comments.ToDTO();
        }

        [HttpGet("{commentId:int}")]
        public async Task<IActionResult> Get(int groupId, int postId, int commentId)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();

            return Ok(comment.ToDTO());
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> Create(int groupId, int postId, CreateCommentDTO createCommentDto)
        {
            var postSpec = new PostByIdSpec(groupId, postId);

            var post = await _postsRepository.FirstOrDefaultAsync(postSpec);

            if (post is null) return NotFound();

            var comment = new Comment()
            {
                Content = createCommentDto.Content,
                CreationDate = DateTime.UtcNow,
                Post = post,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _commentsRepository.AddAsync(comment);

            return Created("", comment.ToDTO());
        }

        [HttpPut("{commentId:int}")]
        public async Task<ActionResult<CommentDTO>> Update(int groupId, int postId, int commentId, UpdateCommentDTO updateCommentDto)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            comment.Content = updateCommentDto.Content;

            await _commentsRepository.UpdateAsync(comment);

            return Ok(comment.ToDTO());
        }

        [HttpDelete("{commentId:int}")]
        public async Task<ActionResult> Remove(int groupId, int postId, int commentId)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();
            
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
