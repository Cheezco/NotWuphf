using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Entities
{
    public class Comment : EntityBase, IGroupResource
    {
        public string Content { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime UpdateDate { get; set; }
        
        public Post Post { get; set; }

        public string GroupOwnerId => Post.GroupOwnerId;
        
        [Required]
        public string UserId { get; set; }
        
        [DisplayName("Author")]
        public WuphfUser User{ get; set;}
    }
}
