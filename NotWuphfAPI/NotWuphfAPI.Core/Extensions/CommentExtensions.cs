using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Extensions
{
    public static class CommentExtensions
    {
        public static CommentDto ToDto(this Comment comment)
            => new(comment.Id, comment.Content, comment.CreationDate);

        public static List<CommentDto> ToDto(this IEnumerable<Comment> comments)
            => comments.Select(x => x.ToDto()).ToList();
    }
}
