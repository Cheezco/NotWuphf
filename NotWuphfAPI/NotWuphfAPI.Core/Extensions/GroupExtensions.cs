using NotWuphfAPI.Core.DTO;
using NotWuphfAPI.Core.Entities;

namespace NotWuphfAPI.Core.Extensions
{
    public static class GroupExtensions
    {
        public static GroupDTO ToDTO(this Group group)
            => new(group.Id, group.Name, group.Description, group.Visibility, group.CreationDate);

        public static List<GroupDTO> ToDTO(this IEnumerable<Group> groups)
            => groups.Select(x => x.ToDTO()).ToList();
    }
}
