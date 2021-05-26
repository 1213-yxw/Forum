import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  List,
  Avatar,
  Popconfirm,
  Empty,
  message,
  Typography,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { User } from "../../PostDetails/User.js";
import ShowPost from "./ShowPost.js";
import "./PostAll.css";
const {  Paragraph } = Typography;

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

export default class PostAll extends Component {
  static propTypes = {
    postId: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postId: this.props.postId,
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
    if (response.data) {
      console.log("删除成功！");
    }
  }

  async componentDidMount() {
    this.getPosts();
  }

  showPosts = () => {
    return this.state.posts.map((post) => {
      return <ShowPost post={post} />;
    });
  };

  typoClose = () => {
    this.setState({
      expand: false,
      counter: !this.state.expand
        ? this.state.counter + 0
        : this.state.counter + 1
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
                title="Are you sure?"
                onConfirm={() =>
                  this.deletePost(item.id) && message.success("Click on Yes")
                }
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Link href="#">Delete</Link>
              </Popconfirm>,
            ]}
          >
            <Avatar src={item.avatar} size={50} />
            <span>
              <Link to={`/postDetails/${item.id}`} className="post-title">
                {item.title}
              </Link>
            </span>
              <Paragraph
                className="post-content"
                ellipsis={
                  item.content
                    ? { rows: 2, expandable: true, symbol: "more" }
                    : false
                }
              >
                {item.content}
              </Paragraph>
            <span>发布于：{item.postDate}</span>
          </List.Item>
        )}
      />
    );
  }
}
