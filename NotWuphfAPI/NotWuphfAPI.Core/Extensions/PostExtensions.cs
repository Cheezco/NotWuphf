using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Extensions
{
    public static class PostExtensions
    {
        public static PostDTO ToDTO(this Post post)
            => new(post.Id, post.Name, post.Body, post.CreationDate);

        public static List<PostDTO> ToDTO(this IEnumerable<Post> posts)
            => posts.Select(x => x.ToDTO()).ToList();
    }
}
