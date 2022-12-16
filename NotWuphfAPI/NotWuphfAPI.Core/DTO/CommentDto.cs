using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record CommentDto(int Id, string Content, DateTime CreationDate);
    public record CreateCommentDto(string Content);
    public record UpdateCommentDto(string Content);
}
