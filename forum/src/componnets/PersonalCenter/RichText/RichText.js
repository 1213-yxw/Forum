import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Modal, Input, message } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftjs from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";
import axios from "axios";
import moment from "moment";
import { User } from "../../PostDetails/User.js";
import PostAll from "../PostAll/PostAll";
import { Link } from "react-router-dom";

//文本内容、标题，时间获取点击提交时间时候获取当时的时间
export default class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      authorId: this.props.authorId,
      posts: [],
      submitting: false,
      value: "",
      postCount: this.props.postCount,
      showRichText: false,
      editorContent: "",
      editorState: "",
    };
  }

  handleClearContent = () => {
    //清空文本
    this.setState({
      editorState: "",
    });
  };
  handleGetText = () => {
    //获取文本内容
    this.setState({
      showRichText: true,
    });
  };
  onEditorStateChange = (editorState) => {
    //编辑器的状态
    this.setState({
      editorState,
    });
  };
  onEditorChange = (editorContent) => {
    //编辑器内容的状态
    this.setState({
      editorContent,
    });
  };

  onChange = (e) => {
    this.setState({ title: e.target.value });
  };

  async addPost(values) {
    var content = this.state.editorContent.blocks[0].text;
    if (values) {
      const response = await axios({
        url: "https://localhost:5001/api/PersonalCenter/addPost",
        method: "POST",
        data: {
          authorId: User.id,
          authorName: User.userName,
          authorAvatar: User.avatar,
          title: this.state.title,
          content: content,
          postdate: moment().format("YYYY-MM-DD HH:MM"),
        },
        headers: { "Content-type": "application/json" },
      });
      if (response.data) {
        message.success("提交成功");
      }
    }
  }

  render() {
    const { editorState, editorContent } = this.state;
    return (
      <div className="div-editor">
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
            <Button
              type="primary"
              onClick={this.addPost.bind(this)}
              style={{ marginLeft: 10 }}
            >
              提交
            </Button>
        </Card>
        <Card>
          <Input placeholder="请输入文章标题" onChange={this.onChange} />
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="demo-editor" //"editorClassName"
            // onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              fontFamily: {
                options: [
                  "宋体",
                  "黑体",
                  "楷体",
                  "微软雅黑",
                  "Arial",
                  "Georgia",
                  "Impact",
                  "Tahoma",
                  "Times New Roman",
                  "Verdana",
                ],
              },
            }}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false,
            });
          }}
          footer={null}
        >
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    );
  }
}
