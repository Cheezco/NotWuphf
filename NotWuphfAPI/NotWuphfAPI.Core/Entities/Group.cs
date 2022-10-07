using NotWuphfAPI.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Entities
{
    public class Group : EntityBase
    {
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastPost { get; set; }
        public List<User> Admins { get; set; }
        public List<User> Users { get; set; }
        public List<Post> Posts { get; set; }
        public GroupVisibility Visibility { get; set; }
    }
}
