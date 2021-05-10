using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApi.Model
{
    public class Post
    {
        //帖子类
        public virtual int Id { get; set; }
        public virtual int AuthorId { get; set; }//作者编号
        public virtual DateTime PostDate { get; set; }//发帖时间
        public virtual string Title { get; set; }//文章标题
        public virtual string Content { get; set; }//文章内容
    }
}
