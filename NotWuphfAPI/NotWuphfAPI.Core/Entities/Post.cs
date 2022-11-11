using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Core.Entities
{
    public class Post : EntityBase, IUserOwnedResource
    {
        public string Name { get; set; }
        
        public string Body { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime UpdateDate { get; set; }
        
        public List<Comment> Comments { get; set; }
        
        public Group Group { get; set; }
        
        [Required]
        public string UserId { get; set; }
        
        [DisplayName("Author")]
        public WuphfUser User { get; set; }
    }
}
