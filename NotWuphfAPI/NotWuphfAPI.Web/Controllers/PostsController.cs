﻿using System.Security.Claims;
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
    [Route("api/groups/{groupId:int}/posts")]
    [ApiController]
    [Authorize(Roles = GroupRoles.GroupUser)]
    public class PostsController : ControllerBase
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Group> _groupsRepository;
        private readonly IAuthorizationService _authorizationService;

        public PostsController(IRepository<Post> postsRepository, IRepository<Group> groupsRepository, IAuthorizationService authorizationService)
        {
            _postsRepository = postsRepository;
            _groupsRepository = groupsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetMany(int groupId, int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            var spec = new PostsSpec(groupId, page, pageSize);
            var posts = await _postsRepository.ListAsync(spec);

            return posts.ToDTO();
        }

        [HttpGet("{postId:int}")]
        public async Task<IActionResult> Get(int groupId, int postId)
        {
            var spec = new PostByIdSpec(groupId, postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();

            return Ok(post.ToDTO());
        }

        [HttpPost]
        public async Task<ActionResult<PostDTO>> Create(int groupId, CreatePostDTO createPostDto)
        {
            var groupSpec = new GroupByIdSpec(groupId);
            var groupExists = await _groupsRepository.AnyAsync(groupSpec);

            if(!groupExists) return NotFound();

            var post = new Post()
            {
                Body = createPostDto.Body,
                Name = createPostDto.Name,
                CreationDate = DateTime.UtcNow,
                GroupId = groupId,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _postsRepository.AddAsync(post);

            return Created("", post.ToDTO());
        }

        [HttpPut("{postId:int}")]
        public async Task<ActionResult<PostDTO>> Update(int groupId, int postId, UpdatePostDTO updatePostDto)
        {
            var spec = new PostByIdSpec(groupId, postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, post, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            post.Body = updatePostDto.Body;

            await _postsRepository.UpdateAsync(post);

            return Ok(post.ToDTO());
        }

        [HttpDelete("{postId:int}")]
        public async Task<ActionResult> Remove(int groupId, int postId)
        {
            var spec = new PostByIdSpec(groupId, postId);
            var post = await _postsRepository.FirstOrDefaultAsync(spec);

            if (post is null) return NotFound();
            
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, post, PolicyNames.ResourceOwner);
            
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await _postsRepository.DeleteAsync(post);

            return NoContent();
        }
    }
}
