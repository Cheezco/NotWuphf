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
        public CommentByIdSpec(int id)
        {
            Query
                .Where(x => x.Id == id);
        }
    }
}
