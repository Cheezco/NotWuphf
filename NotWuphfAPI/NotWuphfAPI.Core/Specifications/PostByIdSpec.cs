using Ardalis.Specification;
using NotWuphfAPI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Specifications
{
    public class PostByIdSpec : Specification<Post>, ISingleResultSpecification<Post>
    {
        public PostByIdSpec(int groupId, int postId)
        {
            Query
                .Where(x => x.Group.Id == groupId && x.Id == postId);
        }
    }
}
