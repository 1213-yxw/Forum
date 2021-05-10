using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApi.Model
{
    public class Like
    {
        //获赞类
        public virtual int Id { get; set; }
        public virtual int PostId { get; set; }//帖子编号
        public virtual int AuthorId { get; set; }//作者编号
        public virtual int CommentId { get; set; }//评论编号
        public virtual int SupportId { get; set; }//点赞者的编号
    }
}
