using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Extensions;
using NotWuphfAPI.Infrastructure.Interfaces;

namespace NotWuphfAPI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Group> _groupsRepository;
        private readonly IRepository<Comment> _commentsRepository;

        public TestController(IRepository<Post> postsRepository, IRepository<Group> groupsRepository, IRepository<Comment> commentsRepository)
        {
            _postsRepository = postsRepository;
            _groupsRepository = groupsRepository;
            _commentsRepository = commentsRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Test()
        {
            var groups = Enumerable.Range(0, 5)
                .Select(x => new Group()
                {
                    Name = $"Group#{x}",
                    Description = $"GroupDescription#{x}",
                    Visibility = Core.Enums.GroupVisibility.Public,
                    CreationDate = DateTime.UtcNow
                }).ToList();

            await _groupsRepository.AddRangeAsync(groups);
            var posts = new List<Post>();

            foreach (var group in groups)
            {
                for (int i = 0; i < 10; i++)
                {
                    posts.Add(new Post()
                    {
                        Body = $"PostBody#{i}",
                        Name = $"Post#{i}",
                        CreationDate = DateTime.UtcNow,
                        Group = group
                    });
                }
            }

            await _postsRepository.AddRangeAsync(posts);

            var comments = new List<Comment>();
            foreach (var post in posts)
            {
                for (int i = 0; i < 10; i++)
                {
                    comments.Add(new Comment()
                    {
                        Content = $"CommentContent#{i}",
                        CreationDate = DateTime.UtcNow,
                        Post = post
                    });
                }
            }

            await _commentsRepository.AddRangeAsync(comments);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Test2()
        {
            var groups = await _groupsRepository.ListAsync();
            var posts = await _postsRepository.ListAsync();
            var comments = await _commentsRepository.ListAsync();

            return Ok(new { Groups = groups.ToDto(), Posts = posts.ToDto(), Comments = comments.ToDto() });
        }
    }
}
