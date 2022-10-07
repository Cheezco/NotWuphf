using Ardalis.Specification;
using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Misc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Specifications
{
    public class CommentsSpec : Specification<Comment>
    {
        public CommentsSpec(int page = PaginationHelper.DefaultPage, int pageSize = PaginationHelper.DefaultPageSize)
        {
            Query
                .Skip(PaginationHelper.CalculateSkip(pageSize, page))
                .Take(PaginationHelper.CalculateTake(pageSize));
        }
    }
}
