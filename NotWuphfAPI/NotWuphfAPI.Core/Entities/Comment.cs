using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Entities
{
    public class Comment : EntityBase
    {
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public Post Post { get; set; }
    }
}
