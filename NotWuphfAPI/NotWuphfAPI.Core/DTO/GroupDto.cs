using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record GroupDto(int Id, string Name, string Description, GroupVisibility Visibility, DateTime CreationDate);
    public record CreateGroupDto(string Name, string Description, GroupVisibility Visibility);
    public record UpdateGroupDto(string Name, string Description, GroupVisibility Visibility);
}
