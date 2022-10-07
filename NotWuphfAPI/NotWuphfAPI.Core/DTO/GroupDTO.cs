using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record GroupDTO(int Id, string Name, string Description, GroupVisibility Visibility, DateTime CreationDate);
    public record CreateGroupDTO(string Name, string Description, GroupVisibility Visibility);
    public record UpdateGroupDTO(string Name, string Description, GroupVisibility Visibility);
}
