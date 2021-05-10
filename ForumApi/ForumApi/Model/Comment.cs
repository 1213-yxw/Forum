using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApi.Model
{
    public class Comment
    {
        //评论类
        public virtual int Id { get; set; }
        public virtual int PostId { get; set; }//帖子编号
        public virtual int CommentatorId { get; set; }//评论者编号
        public virtual int AuthorId { get; set; }//被评论者编号
        public virtual int Content { get; set; }//评论内容
        public virtual DateTime CommentDate { get; set; }//评论时间
    }
}
