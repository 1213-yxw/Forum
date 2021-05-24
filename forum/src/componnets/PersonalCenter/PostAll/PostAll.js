import React, { Component } from "react";
import { List, Avatar, Popconfirm, Empty, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { User } from "../../PostDetails/User.js";
import ShowPost from "./ShowPost.js";


export default class PostAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  async getPosts() {
    var response = await axios(
      `https://localhost:5001/api/PersonalCenter/getPosts/${User.id}`
    );
    if (!response.data) {
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    } else {
      var posts = response.data;
      console.log(posts);
      this.setState({ posts: posts });
    }
  }

   async deletePost(postId) {
    console.log(postId);
    const response = await axios(
      `https://localhost:5001/api/PersonalCenter/deletePost/${postId}`
    );
  }

  async componentDidMount() {
    this.getPosts();
  }

  showPosts = () => {
    return this.state.posts.map((post) => {
      return <ShowPost post={post} />;
    });
  };

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
        footer={null}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Popconfirm
                title="Are you sure？"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Link href="#" onClick={()=>this.deletePost(item.id)}>Delete</Link>
              </Popconfirm>,
            ]}
          >
            <Avatar src={item.avatar} />
            <span>{item.postDate}</span>
            <span>
              <Link to={`/postDetails/${item.id}`}>{item.title}</Link>
            </span>
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}
