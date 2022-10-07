using NotWuphfAPI.Core.Entities;
using NotWuphfAPI.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.DTO
{
    public record GroupDTO(int Id, string Name, GroupVisibility Visibility, DateTime CreationDate);
}
