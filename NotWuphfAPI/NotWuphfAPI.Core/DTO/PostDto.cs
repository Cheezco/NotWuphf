using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record PostDto(int Id, string Name, string Body, DateTime CreationDate);
    public record CreatePostDto(string Name, string Body);
    public record UpdatePostDto(string Body);
}
