using System.Security.Claims;
using System.Text.Json;
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

        [HttpGet(Name = "GetComments")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetMany(int groupId, int postId, int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var spec = new CommentsSpec(groupId, postId, page, pageSize);
            var comments = await _commentsRepository.ListAsync(spec);
            
            var totalCount = await _commentsRepository.CountAsync(spec);
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

            return comments.ToDto();
        }

        [HttpGet("{commentId:int}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<IActionResult> Get(int groupId, int postId, int commentId)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();

            return Ok(comment.ToDto());
        }

        [HttpPost]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<CommentDto>> Create(int groupId, int postId, CreateCommentDto createCommentDto)
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

            return Created("", comment.ToDto());
        }

        [HttpPut("{commentId:int}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult<CommentDto>> Update(int groupId, int postId, int commentId, UpdateCommentDto updateCommentDto)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, PolicyNames.GroupPolicy);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            comment.Content = updateCommentDto.Content;

            await _commentsRepository.UpdateAsync(comment);

            return Ok(comment.ToDto());
        }

        [HttpDelete("{commentId:int}")]
        [Authorize(Roles = GroupRoles.GroupUser)]
        public async Task<ActionResult> Remove(int groupId, int postId, int commentId)
        {
            var spec = new CommentByIdSpec(groupId, postId, commentId);

            var comment = await _commentsRepository.FirstOrDefaultAsync(spec);

            if (comment is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, PolicyNames.GroupPolicy);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await _commentsRepository.DeleteAsync(comment);

            return NoContent();
        }
        
        private string? CreateResourceUri(int page, int pageSize, ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetComments", new
                {
                    page = page - 1,
                    pageSize
                }),
                ResourceUriType.NextPage => Url.Link("GetComments", new
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
