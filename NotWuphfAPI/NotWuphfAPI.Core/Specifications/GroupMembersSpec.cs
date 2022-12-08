using Ardalis.Specification;
using NotWuphfAPI.Core.Auth.Model;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Specifications
{
    public class GroupMembersSpec : Specification<Group, List<WuphfUser>>
    {
        public GroupMembersSpec(int id)
        {
            Query
                .Select(x => x.Members)
                .Where(x => x.Id == id);
        }
    }
}