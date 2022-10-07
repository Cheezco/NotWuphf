using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Entities
{
    public class Post : EntityBase
    {
        public string Name { get; set; }
        public string Body { get; set; }
        public DateTime CreationDate { get; set; }
        public Group Group { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
