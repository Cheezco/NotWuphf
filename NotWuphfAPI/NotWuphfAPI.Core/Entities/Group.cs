using NotWuphfAPI.Core.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Entities
{
    public class Group : EntityBase, IGroupResource
    {
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public DateTime CreationDate { get; set; }

        public DateTime UpdateDate { get; set; }
        
        public List<WuphfUser> Members { get; set; }
        
        [Required]
        public string UserId { get; set; }

        public string GroupOwnerId => UserId;

        [DisplayName("Owner")]
        public WuphfUser User { get; set; }

        public List<Post> Posts { get; set; }
        
        public GroupVisibility Visibility { get; set; }
    }
}
