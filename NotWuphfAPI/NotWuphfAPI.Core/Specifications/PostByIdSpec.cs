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
        public PostByIdSpec(int id)
        {
            Query
                .Where(x => x.Id == id);
        }
    }
}
