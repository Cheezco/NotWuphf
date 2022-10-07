using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Extensions
{
    public static class CommentExtensions
    {
        public static CommentDTO ToDTO(this Comment comment)
            => new(comment.Id, comment.Content, comment.CreationDate);

        public static List<CommentDTO> ToDTO(this IEnumerable<Comment> comments)
            => comments.Select(x => x.ToDTO()).ToList();
    }
}
