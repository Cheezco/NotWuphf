using Ardalis.Specification;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Specifications
{
    public class GroupByIdWithMembersSpec : Specification<Group>, ISingleResultSpecification<Group>
    {
        public GroupByIdWithMembersSpec(int id)
        {
            Query
                .Where(x => x.Id == id);
        }
    }
}