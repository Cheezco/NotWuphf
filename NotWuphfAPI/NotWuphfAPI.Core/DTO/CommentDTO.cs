using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record CommentDTO(int Id, string Content, DateTime CreationDate);
    public record CreateCommentDTO(string Content);
    public record UpdateCommentDTO(string Content);
}
