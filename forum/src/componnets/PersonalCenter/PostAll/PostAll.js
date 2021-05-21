import React, { Component } from "react";
import { List, Avatar, Space } from "antd";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

//与后端连接逻辑未写 如果用户没有创建帖子，将会显示postempty界面
export default class PostAll extends Component {
  constructor(props){
    super(props);
    this.state={
      posts:[]
    }
  }
  async getPosts(){
     var response=await axios("https://localhost:5001/api/PersonalCenter/getPosts")
     var posts=response.data
     this.setState({posts:posts})
  }

  async componentDidMount(){
    this.getPosts()
  }
  render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={this.state.posts}
        footer={
          null
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
          >
             <Avatar src={item.avatar} />
            <span>{item.postDate}</span>
            <span><Link to={{pathname:'/postDetails',state:{postId:item.id}}}>{item.title}</Link></span>
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}
