using Ardalis.Specification;
using NotWuphfAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Specifications
{
    public class CommentByIdSpec : Specification<Comment>, ISingleResultSpecification<Comment>
    {
        public CommentByIdSpec(int groupId, int postId, int commentId)
        {
            Query
                .Where(x => x.Post.Group.Id == groupId && x.Post.Id == postId && x.Id == commentId);
        }
    }
}
