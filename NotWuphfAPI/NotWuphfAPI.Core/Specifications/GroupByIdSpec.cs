using Ardalis.Specification;
using NotWuphfAPI.Core.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Specifications
{
    public class GroupByIdSpec : Specification<Group>, ISingleResultSpecification<Group>
    {
        public GroupByIdSpec(int id)
        {
            Query
                .Where(x => x.Id == id);
        }
    }
}
